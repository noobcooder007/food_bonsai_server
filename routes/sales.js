/*
    path /api/sales
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getMethods, getMethodsById, createMethod, updateMethod, deleteMethod } = require("../controllers/method");
const { getCashes, getCashById, createCash, updateCash, deleteCash, openCash, closeCash, getArchings, getArchingById, updateArching, deleteArching } = require("../controllers/sales");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");


const router = Router();

router.get('/cash',
validateJWT,
getCashes);

router.get('/cash/:cashId',
validateJWT,
getCashById);

router.post('/cash/new',[
    check('name','The name is mandatory').not().isEmpty(),
    check('description','The description is mandatory').not().isEmpty(),
    validateFields
], createCash);

router.post('/cash/update',[
    check('cashId','The cashId is undefined').not().isEmpty(),
    check('name','The name is mandatory').not().isEmpty(),
    check('status','The status is mandatory').isBoolean(),
    check('opened','The opened is mandatory').isBoolean(),
    check('cashier','The cashier is mandatory').not().isEmpty(),
    validateFields
], updateCash);

router.post('/cash/delete',[
    check('cashId','The cashId is undefined').not().isEmpty(),
    validateFields
], deleteCash);

router.post('/cash/open',[
    check('cashId','The cashId is undefined').not().isEmpty(),
    check('arching.date','The arching.date is mandatory').isDate({format: "YYYY-MM-DD"}),
    check('initialMoney','The arching.initialMoney is mandatory').isNumeric(),
    check('finalMoney','The arching.finalMoney is mandatory').isNumeric(),
    check('gain','The arching.gain is mandatory').isNumeric(),
    validateFields
], openCash);

router.post('/cash/close',[
    check('cashId','The cashId is undefined').not().isEmpty(),
    check('finalMoney','The finalMoney is mandatory').isNumeric(),
    validateFields
], closeCash);

router.get('/archings',
validateJWT,
getArchings);

router.get('/archings/:archingId',
validateJWT,
getArchingById);

router.post('/archings/update',[
    check('archingId','The archingId is undefined').not().isEmpty(),
    check('initialMoney','The initialMoney is mandatory').isNumeric(),
    check('finalMoney','The finalMoney is mandatory').isNumeric(),
    validateFields
], updateArching);

router.post('/archings/delete',[
    check('archingId','The archingId is undefined').not().isEmpty(),
    validateFields
], deleteArching);

router.get('/methods',
validateJWT,
getMethods);

router.get('/methods/:methodId',
validateJWT,
getMethodsById);

router.post('/methods/new',[
    check('name','The name is mandatory').not().isEmpty(),
    validateFields
], createMethod);

router.post('/methods/update',[
    check('methodId','The methodId is undefined').not().isEmpty(),
    check('name','The name is mandatory').not().isEmpty(),
    validateFields
], updateMethod);

router.post('/methods/delete',[
    check('methodId','The methodId is undefined').not().isEmpty(),
    validateFields
], deleteMethod);

module.exports = router;