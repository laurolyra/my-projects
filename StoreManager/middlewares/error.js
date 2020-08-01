const notFound = { message: 'Não encontrado', code: 'not_found' };
const badData = { message: 'Dados inválidos', code: 'bad_data' };
const exists = { message: 'Já cadastrado', code: 'already_exists' };

const errorcodes = {
  not_found: 404,
  forbidden: 403,
  unauthorized: 401,
  bad_data: 422,
  already_exists: 409,
};

const errorHandler = (error, _req, res, _next) => res.status(errorcodes[error.code] || 500)
  .json({ error });

module.exports = { errorHandler, notFound, badData, exists };
