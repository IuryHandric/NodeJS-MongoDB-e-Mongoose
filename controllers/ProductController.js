const Product = require('../models/Product')

module.exports = class ProductController {

    static async showProducts(req, res) {

        const products = await Product.find().lean()

        res.render('products/all', { products })
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    static async createProductPost(req, res) {
        const name = req.body.name
        const image = req.body.image
        const price = req.body.price
        const description = req.body.description


        // Passando os parâmetros como objeto
        const product = new Product({name, image, price, description})

        await product.save()
        
        console.log(`Produto [${name}] criado com sucesso!`)

        res.redirect('/products')
    }

    static async getProduct(req, res) {
        const id = req.params.id

        const product = await Product.findById(id).lean()

        res.render('products/product', { product })

    }

    static async removeProduct(req, res) {
        const id = req.params.id

        await Product.deleteOne({_id: id})
        console.log('Produto exluído com sucesso!')
        res.redirect('/products')

    }

    static async editProduct(req, res) {
        const id = req.params.id

        const product = await Product.findById(id).lean()

        res.render('products/edit', { product })
    }

    static async editProductPost(req, res) {
        const id = req.body.id
        const name = req.body.name
        const image = req.body.image
        const price = req.body.price
        const description = req.body.description

        // Transformando em Objeto
        
        const product = {name, image, price, description};

        // Chama o model, informa qual o ID que vai ser editado e depois passa o que será modificado, no caso o objeto criado

        await Product.updateOne({_id: id}, product)
        
        console.log('Produto editado com sucesso!')
        res.redirect('/products')

    }

}