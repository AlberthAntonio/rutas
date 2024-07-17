import { Request, Response } from "express";
import { LoginUserDTO } from "../../domain/dtos/auth/login-user.dto";
import { CustomError } from "../../domain/errors/custom.errors";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { EmailService } from "./email.service";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { envs } from "../../config";
import { User } from "../../data";

enum Status {
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED"
}

export class AuthService {
    constructor(
        private readonly emailService: EmailService,
    ) {}

    public async register( registerUserDto: RegisterUserDto){
      const existUser = await User.findOne({
          where: {
            email: registerUserDto.email,
            status: Status.ACTIVE,
          }
      });

      if(existUser) throw CustomError.badRequest("Email already exists")
      
      const user = new User()
      user.name = registerUserDto.name;
      user.email = registerUserDto.email;
      user.password = registerUserDto.password;

      try {
          await user.save();

          await this. sendEmailValidationLink(user.email);
          
          const token = await JwtAdapter.generateToken({id: user.id})
          if(!token) throw CustomError.internalServer("Error while creating JWT")

          return{ token, user }

      } catch (error: any) {
          throw CustomError.internalServer(error);
      }
    }

    public sendEmailValidationLink = async(email: string) => {
      const token = await JwtAdapter.generateToken({email})
      if(!token) throw CustomError.internalServer("Error getting token")

      const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
      const html = `
          <h1> Validate your email </h1>
          <p> Click the link below to validate your email </p>
          <a href="${link}">Validate your email ${email} </a>
      `;

      const isSent = this.emailService.sendEmail({
          to: email,
          subject: "Validate your email",
          htmlBody: html,
      })
      if(!isSent) throw CustomError.internalServer("Error sending email")

      return true
  }

    public login = async(loginUseDto: LoginUserDTO) => {
        // Buscar usuario en la base de datos
        const user = await User.findOne({ 
        where: {
              email: loginUseDto.email,
              status: Status.ACTIVE,
              emailValidated: true,
          }
        })
      
        if (!user) throw CustomError.unAutorized("Email not exist")
        
        // Validar si la contraseña es correcta
        const isMatch = bcryptAdapter.compare(loginUseDto.password, user.password)
        if (!isMatch) throw CustomError.unAutorized("Invalid password")
  
        // Generar token
        const token = await JwtAdapter.generateToken({id: user.id})
        if(!token) throw CustomError.internalServer("Error while creating JWT")
        
          // Devolver la informacion del usuario
        return {
          token: token,
          user: {
              id: user.id,
              name: user.name,
              email: user.email,
              rol: user.rol,
          }
        }
    }
}