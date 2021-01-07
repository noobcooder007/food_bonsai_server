/*
    path: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/',[
    check('email','The email is mandatory').isEmail(),
    check('password','The password is mandatory with min length 8').isLength({min: 8}),
    validateFields
], loginUser);

router.post('/new',[
    check('email','The email is mandatory').isEmail(),
    check('password','The password is mandatory with min length 8').isLength({min:8}),
    check('name','The name is mandatory').not().isEmpty(),
    check('lastname', 'The lastname is mandatory').not().isEmpty(),
    check('contact.phone','The telephone is invalid').isMobilePhone('es-MX'),
    check('contact.address.street','The street is mandatory').not().isEmpty(),
    check('contact.address.number','The number is mandatory').isNumeric(),
    check('contact.address.cp','The C.P. is mandatory').isPostalCode('MX'),
    check('contact.address.city','The city is mandatory'),
    check('access.level','The level is mandatory').not().isEmpty(),
    check('access.group','The group is mandatory').not().isEmpty(),
    check('workshift','The workshift is mandatory').not().isEmpty(),
    validateFields
], createUser);

router.get('/renew',
validateJWT,
renewToken);

module.exports = router;