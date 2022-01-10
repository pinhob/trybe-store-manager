const express = require('express');

const { createProductController,
  getAllProductsController,
  getProductByIdController } = require('./controllers/products.controller');
const { errorMiddleware } = require('./middlewares/errorMiddleware');

const port = 3000;
const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// feito com a ajuda do Wesley Maia
app.post('/products', createProductController);

app.get('/products', getAllProductsController);

app.get('/products/:id', getProductByIdController);

app.use(errorMiddleware);

app.listen(port, () => console.log('Ouvindo a porta 3000'));
