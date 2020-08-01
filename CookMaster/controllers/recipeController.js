const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

// devolvendo os dados para a view. Aqui eu renderizo o arquivo HOME com informações

const listRecipes = async (req, res) => {
  const recipes = await recipeModel.listRecipes();
  const loggedIn = req.user || null;
  res.render('home', { recipes, loggedIn });
};

const ownRecipes = async (req, res) => {
  const { id } = req.user;
  const recipes = await recipeModel.ownRecipes(id);
  const loggedIn = req.user || null;
  res.render('me/myrecipes', { recipes, loggedIn });
};

const listOneRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.listOneRecipe(id);
  const loggedIn = req.user || null;
  res.render('recipes/show', { recipe, loggedIn });
};

const newRecipe = async (req, res) => {
  res.render('recipes/new', { message: null, isLogged: req.user });
};

const insertRecipe = async (req, res) => {
  const { recipe_name, ingredients, how_to_prepare } = req.body;
  const { id } = req.user;

  if (!recipeModel.verifyInputs(recipe_name, ingredients, how_to_prepare)) {
    return res.render('recipes/new', { message: 'Dados inválidos', isLogged: req.user });
  }

  await recipeModel.insertRecipe(recipe_name, ingredients, how_to_prepare, id);
  res.redirect('/');
};

const compareIds = async (req, res) => {
  const { id: recipeId } = req.params;
  const recipe = await recipeModel.findIdRecipe(recipeId);
  const { authorId } = recipe;
  if (authorId === req.user.id) {
    return res.render('recipes/edit', { recipe, message: null, isLogged: req.user });
  }
  return res.redirect(`/recipes/${recipeId}`);
};

const editRecipe = async (req, res) => {
  const { name, ingredients, howToPrepare } = req.body;
  const { id: recipeId } = req.params;
  const { id: userId } = req.user;
  const recipe = await recipeModel.findIdRecipe(recipeId);
  const { authorId } = recipe;

  if (userId && userId === authorId) {
    await recipeModel.editRecipe(recipeId, name, ingredients, howToPrepare);
    return res.redirect(`/recipes/${recipeId}`);
  }
  res.redirect('/');
};

const compareIdsDeleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const recipe = await recipeModel.findIdRecipe(id);
  const { authorId, id: recipeId } = recipe;
  if (authorId === userId) {
    return res.render('recipes/delete', { recipe, message: null, isLogged: req.user });
  }
  return res.redirect(`/recipes/${recipeId}`);
};

const deleteRecipe = async (req, res) => {
  const { password } = req.body;
  const { id: idParams } = req.params;
  const { id: idUser } = req.user;
  const recipe = await recipeModel.findIdRecipe(idParams);
  const { authorId, id: recipeId } = recipe;
  const user = await userModel.findById(authorId);
  const { password: userPass } = user;
  if (idUser && userPass === password) {
    await recipeModel.deleteRecipe(recipeId);
    return res.redirect('/');
  }
  if (idUser && userPass !== password) {
    return res.render(
      'recipes/delete',
      {
        recipe,
        message: 'Senha incorreta',
        isLogged: req.user,
      },
    );
  }
  return res.redirect(`/recipes/${idParams}`);
};

const searchRecipe = async (req, res) => {
  const { id: userId } = req.user;
  const search = req.query.q || null;
  const recipes = await recipeModel.searchRecipe(search);
  if (userId && search) {
    return res.render('recipes/search', { message: null, recipes });
  }
  if (userId) {
    return res.render('recipes/search', { message: null, recipes: null });
  }
};

module.exports = {
  listRecipes,
  listOneRecipe,
  newRecipe,
  insertRecipe,
  compareIds,
  editRecipe,
  compareIdsDeleteRecipe,
  deleteRecipe,
  searchRecipe,
  ownRecipes,
};
