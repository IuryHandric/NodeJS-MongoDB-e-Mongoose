const conn = require('../db/conn')


// Para conseguir ler o ObjectId no mongoDB
const { ObjectId } = require('mongodb')

// Criando classe

class Product {

    // Criando o construtor com as propriedades   
    constructor(name, image, price, description) {

        // Associando as propriedades do objeto
        this.name = name
        this.image = image
        this.price = price
        this.description = description
    }
    // Método save para salvar (função criada) CREATE
    save() {
        // Método para enviar ao banco de dados, passando os parâmetros da classe
        const product = conn.db().collection('products').insertOne({
            name: this.name,
            image: this.image,
            price: this.price,
            description: this.description
        })

        return product
    }

    // Método para resgatar valores do banco
    static getProducts() {

        const products = conn.db().collection('products').find().toArray()

        return products
    }

    static async getProductById(id) {
        const product = await conn.db().collection('products').findOne({ _id: new ObjectId(id) })

        return product
    }

    static async removeProductById(id) {
        const product = await conn.db().collection('products').deleteOne({ _id: new ObjectId(id) })

        return product
    }

    // Update em 01 produto

    updateProduct(id) {
      // método set para informar oque será atualizado
        const product = conn.db().collection('products').updateOne({_id: new ObjectId(id)}, {$set: this})

        return product
    }

}

module.exports = Product