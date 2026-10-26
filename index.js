const express = require('express');
const db = require('./db');
const app = express()
const port = 3000
app.use(express.json())
const converterTemperatura = require('./converterTemperatura');

app.get('/', (req, res) => {
    res.send('Bem-vindo à API de Medições!');
});

app.get('/temperatura', (req, res) => {
    const { temperatura, unidade } = req.query;

    if (!temperatura || !unidade) {
        return res.status(400).json({ error: 'Parâmetros temperatura e unidade são obrigatórios.' });
    }

    const resultado = converterTemperatura(temperatura, unidade);
    res.json({ resultado });
});



// Rota para buscar todas as medições
app.get('/medicoes', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM medicoes');
        return res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar medições.' });
    }
});

app.post('/medicoes', async (req, res) => {
    const { descricao, tipo, valor_original, unidade_original } = req.body;

    if (!descricao || !tipo || !valor_original || !unidade_original) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    let valor_convertido, unidade_convertida, classificacao;

    if (tipo === 'temperatura') {
        const resultado = converterTemperatura(valor_original, unidade_original);
        valor_convertido = resultado.valor_convertido;
        unidade_convertida = resultado.unidade_convertida;
        classificacao = resultado.classificacao;
    } else {
        return res.status(400).json({ error: 'Tipo de medição não suportado.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO medicoes (descricao, tipo, valor_original, unidade_original, valor_convertido, unidade_convertida, classificacao) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [descricao, tipo, valor_original, unidade_original, valor_convertido, unidade_convertida, classificacao]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao cadastrar medição.' });
    }
});

app.put('/medicoes/:id', async (req, res) => {
    const { id } = req.params;
    const { descricao, tipo, valor_original, unidade_original } = req.body;

    if (!descricao || !tipo || !valor_original || !unidade_original) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    let valor_convertido, unidade_convertida, classificacao;

    if (tipo === 'temperatura') {
        const resultado = converterTemperatura(valor_original, unidade_original);
        valor_convertido = resultado.valor_convertido;
        unidade_convertida = resultado.unidade_convertida;
        classificacao = resultado.classificacao;
    } else {
        return res.status(400).json({ error: 'Tipo de medição não suportado.' });
    }

    try {
        const [result] = await db.query(
            'UPDATE medicoes SET descricao = ?, tipo = ?, valor_original = ?, unidade_original = ?, valor_convertido = ?, unidade_convertida = ?, classificacao = ? WHERE id = ?',
            [descricao, tipo, valor_original, unidade_original, valor_convertido, unidade_convertida, classificacao, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Medição não encontrada.' });
        }

        res.json({ message: 'Medição atualizada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar medição.' });
    }
});

app.delete('/medicoes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM medicoes WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Medição não encontrada.' }); 
} 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar medição.' });
    }
});

//medicao post
app.post('/medicoes', async (req, res) => {
    const { descricao, tipo, valor_original, unidade_original } = req.body;

    if (!descricao || !tipo || !valor_original || !unidade_original) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    let valor_convertido, unidade_convertida, classificacao;

    if (tipo === 'temperatura') {
        const resultado = converterTemperatura(valor_original, unidade_original);
        valor_convertido = resultado.valor_convertido;
        unidade_convertida = resultado.unidade_convertida;
        classificacao = resultado.classificacao;
    } else {
        return res.status(400).json({ error: 'Tipo de medição não suportado.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO medicoes (descricao, tipo, valor_original, unidade_original, valor_convertido, unidade_convertida, classificacao) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [descricao, tipo, valor_original, unidade_original, valor_convertido, unidade_convertida, classificacao]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao cadastrar medição.' });
    }
});


//medicao put
app.put('/medicoes/:id', async (req, res) => {
    const { id } = req.params;
    const { descricao, tipo, valor_original, unidade_original } = req.body;

    if (!descricao || !tipo || !valor_original || !unidade_original) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    let valor_convertido, unidade_convertida, classificacao;

    if (tipo === 'temperatura') {
        const resultado = converterTemperatura(valor_original, unidade_original);
        valor_convertido = resultado.valor_convertido;
        unidade_convertida = resultado.unidade_convertida;
        classificacao = resultado.classificacao;
    } else {
        return res.status(400).json({ error: 'Tipo de medição não suportado.' });
    }

    try {
        const [result] = await db.query(
            'UPDATE medicoes SET descricao = ?, tipo = ?, valor_original = ?, unidade_original = ?, valor_convertido = ?, unidade_convertida = ?, classificacao = ? WHERE id = ?',
            [descricao, tipo, valor_original, unidade_original, valor_convertido, unidade_convertida, classificacao, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Medição não encontrada.' });
        }

        res.json({ message: 'Medição atualizada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar medição.' });
    }
});

//medicao delete
app.delete('/medicoes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM medicoes WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Medição não encontrada.' });
        }

        res.json({ message: 'Medição deletada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar medição.' });
    }
});


app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
}); 