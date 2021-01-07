/*
    path: /api/users
*/

const { Router } = require('express');
const { getUsers, updateUser, updatePassword, deleteUser, activateUser, updateWorkshift, updateAccess } = require('../controllers/users');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');
const { check } = require('express-validator');

const router = Router();

router.get('/',
validateJWT,
getUsers);

router.post('/update',[
    check('userId','The userId is undefined').not().isEmpty(),
    check('name','The name is mandatory').not().isEmpty(),
    check('lastname','The lastname is mandatory').not().isEmpty(),
    check('contact.phone','The phone is mandatory').isMobilePhone('es-MX'),
    check('contact.address.street','The street is mandatory').not().isEmpty(),
    check('contact.address.number','The number is mandatory').isNumeric(),
    check('contact.address.cp','The cp is mandatory').isPostalCode('MX'),
    validateFields
], updateUser);

router.post('/update/workshift',[
    check('userId','The userId is mandatory').not().isEmpty(),
    check('workshift','The workshift is mandatory').not().isEmpty(),
    validateFields
], updateWorkshift);

router.post('/update/password',[
    check('userId','The userId is undefined').not().isEmpty(),
    check('password','The password is mandatory').not().isEmpty(),
    check('repassword','repassword must have the same value as the password field').custom((value, { req }) => value === req.body.password ),
    validateFields
], updatePassword);

router.post('/update/access',[
    check('access.level','The level is mandatory').isNumeric(),
    check('access.group','The group is mandatory').not().isEmpty(),
    validateFields
], updateAccess);

router.post('/delete',[
    check('userId','The id is undefined'),
    validateFields
], deleteUser);

router.post('/activate',[
    check('userId','The id is undefined'),
    validateFields
], activateUser);

module.exports = router;