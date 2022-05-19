const jwt = require('jsonwebtoken')
const secretKeyword = process.env.SECRET_KEY

const tokenGenerator = (payload) => {
    return jwt.sign(payload, secretKeyword, {expiresIn: '2h'})
}

const payloadReader = (token) => {
    return jwt.verify(token, secretKeyword)
}

module.exports = {
    tokenGenerator,
    payloadReader
}