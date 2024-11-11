require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
    res.render('home');
});

const { selectProduts } = require('./src/db');
  
app.get('/produts', async (req, res) => {
    try {
        const results = await selectProduts();
        res.render('produts', { produtos: results });
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).send("Erro ao buscar produtos");
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na url localhost:${port}`);
});
