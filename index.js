require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');

const port = process.env.PORT || 3006
const app = express();

const conn = require('./db/conn')

const productRoutes = require('./routes/products.routes')

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());

app.use(express.static('public'));

app.use('/products', productRoutes)

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})