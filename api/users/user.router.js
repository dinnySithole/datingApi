const {createUser, getUsers, getUsersById, login} = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/', checkToken, createUser);
router.get('/:id', checkToken, getUsersById);
router.get('/', checkToken, getUsers);

router.post('/login', login);

module.exports = router;