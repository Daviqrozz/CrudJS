const mysql = require('mysql2/promise');
const express = require('express');
const app = express();

// Cria a pool de conexão usando a variável de ambiente
const pool = mysql.createPool(process.env.CONNECTION_STRING);

async function selectProduts() {
    const [rows] = await pool.query('SELECT * FROM produts');
    return rows;  // Retorna os dados da consulta
}

app.get('/produts', async (req, res) => {
    try {
        const results = await selectProduts();
        res.json(results);  // Retorna os resultados como JSON
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).send("Erro ao buscar produtos");
    }
});

module.exports = { selectProduts };
