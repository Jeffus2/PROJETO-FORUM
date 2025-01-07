const express = require('express');
const app = express();
const port = 3030;https://github.com/codespaces

app.get('/', (req, res) => {
    res.send('Rodando na porta 3030');
});

app.listen(port, () => {
    console.log(`rodando na port: ${port}`);
})