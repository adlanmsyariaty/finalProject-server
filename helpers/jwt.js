const jwt = require('jsonwebtoken')
const secretKeyword = process.env.SECRET

const tokenGenerator = (payload) => {
    console.log(secretKeyword)
    return jwt.sign(payload, secretKeyword, {expiresIn: '2h'})
}

const payloadReader = (token) => {
    return jwt.verify(token, secretKeyword)
}

module.exports = {
    tokenGenerator,
    payloadReader
}