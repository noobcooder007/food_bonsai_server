/*
    path: /api/rol
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getRoles, getRolById, createRol, updateRol, deleteRol } = require("../controllers/rol");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");


const router = Router();

router.get('/',
validateJWT,
getRoles);

router.get('/:rolId',
validateJWT,
getRolById);

router.post('/new',[
    check('name','The name is mandatory').not().isEmpty(),
    validateFields
], createRol);

router.post('/update',[
    check('rolId','The rolId is undefined').not().isEmpty(),
    check('name','The name in mandatory').not().isEmpty(),
    check('permits.user').isBoolean(),
    check('permits.inventory').isBoolean(),
    check('permits.cash').isBoolean(),
    check('permits.table').isBoolean(),
    check('permits.expenses').isBoolean(),
    check('permits.clients').isBoolean(),
    check('permits.providers').isBoolean(),
    check('permits.movements').isBoolean(),
    validateFields
], updateRol);

router.post('/delete',[
    check('rolId','The rolId is undefined').not().isEmpty(),
    validateFields
], deleteRol)

module.exports = router;