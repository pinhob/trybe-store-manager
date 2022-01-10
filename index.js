const express = require('express');

const { createProductController } = require('./controllers/products.controller');
const { errorMiddleware } = require('./middlewares/errorMiddleware');

const port = 3000;
const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', createProductController);

app.use(errorMiddleware);

app.listen(port, () => console.log('Ouvindo a porta 3000'));
