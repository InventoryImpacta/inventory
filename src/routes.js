const { Router } = require('express');
const UserController = require('./Controllers/UserController');
const SessionController = require('./Controllers/SessionController');
const CategoryController = require('./Controllers/CategoryController');
const ProductsContoller = require('./Controllers/ProductsController');
const ProvidersController = require('./Controllers/ProvidersController');
const PurchasesController = require('./Controllers/PurchasesController');
const auth = require('./middlewares/auth');

const routes = Router();

routes.get('/', (request, response) => response.send('Servidor Impacta'));

routes.post('/session', SessionController.create);

routes.route('/users')
.get(auth, UserController.index)
.post(UserController.create);

routes.route('/users/:id')
.put(auth, UserController.update)
.get(auth, UserController.show);

routes.route('/categories')
.post(CategoryController.create)
.get(CategoryController.index);

routes.route('/categories/:id')
.get(CategoryController.show)
.put(CategoryController.update);

routes.route('/products')
.post(auth, ProductsContoller.create)
.get(auth, ProductsContoller.index);

routes.route('/products/:id')
.get(auth, ProductsContoller.show)
.put(auth, ProductsContoller.update);

routes.route('/providers')
.post(auth, ProvidersController.create)
.get(auth, ProvidersController.index);

routes.route('/providers/:id')
.get(auth, ProvidersController.show)
.put(auth, ProvidersController.update);

routes.route('/purchases')
.post(auth, PurchasesController.create)
.get(auth, PurchasesController.index);

routes.route('/purchases/:id')
.get(auth, PurchasesController.show)
.put(auth, PurchasesController.update);

module.exports = routes;
