const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipeController.listRecipes);

app.get('/recipes/new', middlewares.auth(), controllers.recipeController.newRecipe);

app.get('/me/recipes', middlewares.auth(), controllers.recipeController.ownRecipes);

app.get('/me/edit', middlewares.auth(), controllers.userController.showEditUser);

app.post('/me', middlewares.auth(), controllers.userController.editUser);

app.post('/recipes', middlewares.auth(), controllers.recipeController.insertRecipe);

app.get('/recipes/search', middlewares.auth(), controllers.recipeController.searchRecipe);

app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.compareIds);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.compareIdsDeleteRecipe);

app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteRecipe);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.listOneRecipe);

app.post('/recipes/:id', middlewares.auth(), controllers.recipeController.editRecipe);

app.get('/admin', middlewares.auth(), (req, res) => res.render('admin/home', { user: req.user }));

app.get('/users/new', middlewares.auth(false), controllers.userController.newUser);

app.post('/users/new', middlewares.auth(false), controllers.userController.insertUser);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('*', (_req, res) => res.status(200).json({ Error: '404 - Not Found' }));

app.listen(3000, () => console.log('Listening on 3000'));
