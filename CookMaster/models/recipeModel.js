const { dbLogin, dbGetSchema } = require('./connection');
// buscando as receitas no banco, retornando todas as cadastradas.
const listRecipes = () => (
  dbLogin()
    .then((session) => session.sql(
      `SELECT
      r.id,
      r.recipe_name,
      r.ingredients,
      r.how_to_prepare,
      u.first_name,
      u.last_name
      FROM Recipes as r
      INNER JOIN Users as u
      ON u.id = r.author_id`,
    ).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes
      .map(([id, recipeName, ingredients, howToPrepare, firstName, lastName]) => ({
        id,
        recipeName,
        ingredients,
        howToPrepare,
        firstName,
        lastName,
      })))
);

const listOneRecipe = async (param) => {
  const recipeData = await dbGetSchema()
    .then((db) =>
      db
        .getTable('Recipes')
        .select(['id', 'recipe_name', 'ingredients', 'how_to_prepare', 'author_id'])
        .where('id = :id')
        .bind('id', param)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipe) => recipe[0]);

  if (!recipeData) return null;

  const [id, recipeName, ingredients, howToPrepare, authorId] = recipeData;

  return { id, recipeName, ingredients, howToPrepare, authorId };
};

const verifyInputs = (name, ingredients, howToPrepare) => {
  if (!name || typeof name !== 'string') return false;
  if (!ingredients || typeof ingredients !== 'string') return false;
  if (!howToPrepare || typeof howToPrepare !== 'string') return false;
  return true;
};

const insertRecipe = async (name, ingredients, howToPrepare, authorId) => {
  await dbGetSchema().then((db) =>
    db
      .getTable('Recipes')
      .insert(['recipe_name', 'ingredients', 'how_to_prepare', 'author_id'])
      .values(name, ingredients, howToPrepare, authorId)
      .execute());
};

const findIdRecipe = async (param) => {
  const recipeId = await dbGetSchema().then((db) => db
    .getTable('Recipes')
    .select(['id', 'recipe_name', 'ingredients', 'how_to_prepare', 'author_id'])
    .where('id = :id')
    .bind('id', param)
    .execute()
    .then((results) => results.fetchAll())
    .then((ids) => ids[0]));

  if (!recipeId) return null;

  const [id, recipeName, ingredients, howToPrepare, authorId] = recipeId;

  return { id, recipeName, ingredients, howToPrepare, authorId };
};

const editRecipe = async (id, recipeName, ingredients, howToPrepare) => {
  await dbLogin().then((session) =>
    session.sql(
      `UPDATE cook_master.Recipes
      SET
        recipe_name = ?,
        ingredients = ?,
        how_to_prepare = ?
      WHERE id = ?;`,
    )
      .bind(recipeName)
      .bind(ingredients)
      .bind(howToPrepare)
      .bind(id)
      .execute());
};

const deleteRecipe = async (param) => {
  await dbGetSchema().then((db) =>
    db
      .getTable('Recipes')
      .delete()
      .where('id = :id')
      .bind('id', param)
      .execute());
};

const searchRecipe = async (param) =>
  dbLogin().then((session) =>
    session.sql(
      `SELECT
      r.id,
      r.recipe_name,
      u.first_name,
      u.last_name
      FROM Recipes as r
      INNER JOIN Users AS u ON u.id = r.author_id
      WHERE r.recipe_name REGEXP ?;`,
    )
      .bind(param)
      .execute())
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, recipeName, firstName, lastName]) =>
        ({ id, recipeName, firstName, lastName }) || null));


const ownRecipes = async (id) =>
  dbLogin().then((session) =>
    session.sql(
      `SELECT
      r.id,
      r.recipe_name,
      u.first_name,
      u.last_name
      FROM Recipes as r
      INNER JOIN Users AS u ON u.id = r.author_id
      WHERE r.author_id = ?;`,
    )
      .bind(id)
      .execute())
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([recipeId, recipeName, ingredients, howToPrepare, firstName, lastName]) =>
        ({ recipeId, recipeName, ingredients, howToPrepare, firstName, lastName }) || null));

module.exports = {
  listRecipes,
  listOneRecipe,
  verifyInputs,
  insertRecipe,
  findIdRecipe,
  editRecipe,
  deleteRecipe,
  searchRecipe,
  ownRecipes,
};
