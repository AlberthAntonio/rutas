import { compare, compareSync, genSaltSync, hashSync } from "bcryptjs"

export const bcryptAdapter = {

    hash: (password: string) => {
        const jump = genSaltSync(12)
        return hashSync(password, jump)
    },
    compare: (bodyPassword: string, hashPassword: string): boolean => {
        return compareSync(bodyPassword, hashPassword)
    }
}