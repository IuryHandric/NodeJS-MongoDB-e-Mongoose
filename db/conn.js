require('dotenv').config();
const mongoose = require('mongoose')

const uri = process.env.URI

async function main() {
    await mongoose.connect(uri)
    console.log('Conexão ao MongoDB bem sucedida!')
}

main().catch((e) => console.log('Erro de conexão', e))

module.exports = mongoose