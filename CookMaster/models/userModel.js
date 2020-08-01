const { dbGetSchema, dbLogin } = require('./connection');
/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (emailInput) => {
  const emailData = await dbGetSchema()
    .then((db) =>
      db
        .getTable('Users')
        .select(['id', 'email', 'pass', 'first_name', 'last_name'])
        .where('email = :email')
        .bind('email', emailInput)
        .execute())
    .then((results) => results.fetchAll())
    .then((emailList) => emailList[0]);

  if (!emailData) return null;

  const [id, email, password] = emailData;

  return { id, email, password };
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (userId) => {
  const userData = await dbGetSchema()
    .then((db) =>
      db
        .getTable('Users')
        .select(['id', 'email', 'pass', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', userId)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((emailList) => emailList[0]);

  if (!userData) return null;

  const [id, email, password, firstName, lastName] = userData;

  return { id, email, password, firstName, lastName };
};

const checkMail = (email, pass, firstName, lastName) => {
  if (!email || !pass || !firstName || !lastName) return false;
  if (typeof email !== 'string' || typeof pass !== 'string'
    || typeof firstName !== 'string' || typeof lastName !== 'string') return false;
  return true;
};

const insertUser = async (email, pass, firstName, lastName) => {
  const db = await dbGetSchema();
  await db.getTable('Users')
    .insert(['email', 'pass', 'first_name', 'last_name'])
    .values(email, pass, firstName, lastName)
    .execute();
};

const editUser = async (id, email, pass, firstName, lastName) => {
  await dbLogin().then((session) =>
    session.sql(
      `UPDATE cook_master.Users
      SET
        email = ?,
        pass = ?,
        first_name = ?,
        last_name = ?
      WHERE id = ?;`,
    )
      .bind(email)
      .bind(pass)
      .bind(firstName)
      .bind(lastName)
      .bind(id)
      .execute());
};

module.exports = {
  findByEmail,
  findById,
  checkMail,
  insertUser,
  editUser,
};
