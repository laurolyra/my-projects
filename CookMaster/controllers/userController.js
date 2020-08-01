const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');

const loginForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('admin/login', {
    message: null,
    redirect: req.query.redirect,
  });
};

const login = async (req, res, next) => {
  const { email, password, redirect } = req.body;

  if (!email || !password)
    return res.render('admin/login', {
      message: 'Preencha o email e a senha',
      redirect: null,
    });

  const user = await userModel.findByEmail(email);
  if (!user || user.password !== password)
    return res.render('admin/login', {
      message: 'Email ou senha incorretos',
      redirect: null,
    });

  const token = uuid();
  SESSIONS[token] = user.id;

  res.cookie('token', token, { httpOnly: true, sameSite: true });
  res.redirect(redirect || '/admin');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

const newUser = (_req, res) => {
  res.render('./user/newUser', { message: null });
};

const insertUser = async (req, res) => {
  const { email, pass, firstName, lastName } = req.body;

  if (!userModel.checkMail(email, pass, firstName, lastName)) {
    return res.render('./user/newUser', { message: 'Dados inválidos' });
  }

  await userModel.insertUser(email, pass, firstName, lastName);
  res.status(200).render('./admin/login', { message: null, redirect: null });
};

const showEditUser = async (req, res) => {
  res.render('me/edit', { message: null, isLogged: req.user });
};

const editUser = async (req, res) => {
  const { email, pass, firstName, lastName } = req.body;
  const { id: userId } = req.user;
  if (!firstName || !lastName || !pass) {
    return res.render('me/edit',
      {
        message: 'Erro. Favor preencher todos os campos.',
      });
  }
  const alreadyExistEmail = await userModel.findByEmail(email);
  if (alreadyExistEmail && alreadyExistEmail.id !== userId) {
    return res.render('me/edit',
      {
        message: 'Erro. Email já cadastrado.',
      });
  }
  await userModel.editUser(userId, email, pass, firstName, lastName);

  const { password, ...userData } = await userModel.findById(userId);

  req.user = userData;

  res.render('admin/home', { user: req.user });
};

module.exports = {
  login,
  loginForm,
  logout,
  newUser,
  insertUser,
  showEditUser,
  editUser,
};
