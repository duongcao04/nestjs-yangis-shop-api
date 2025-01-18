const bcrypt = require('bcrypt')

const saltRounds = 10
export const hashPasswordHelper = (plainPassword: string) => {
    try {
        const salt = bcrypt.genSaltSync(saltRounds)
        return bcrypt.hashSync(plainPassword, salt)
    } catch (error) {
        throw new Error(error)
    }
}

export const comparePasswordHelper = (
    inputPassword: string,
    hashedPassword: string,
) => {
    try {
        return bcrypt.compareSync(inputPassword, hashedPassword)
    } catch (error) {
        throw new Error(error)
    }
}
