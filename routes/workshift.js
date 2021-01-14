/*
    path: /api/workshift
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getWorkshifts, createWorkshift, updateWorkshift, deleteWorkshift, getWorkshiftById } = require("../controllers/workshift");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.get('/',
validateJWT,
getWorkshifts);

router.get('/:workshiftId',
validateJWT,
getWorkshiftById);

router.post('/new',[
    check('name','The name is mandatory').not().isEmpty(),
    check('startHour','The start hour is mandatory').isLength({min: 5, max: 5}),
    check('endHour','The end hour is mandatory').isLength({min: 5, max: 5}),
    validateFields
], createWorkshift);

router.post('/update',[
    check('workshiftId','The workshiftId is undefined').not().isEmpty(),
    check('name','The name is mandatory').not().isEmpty(),
    check('startHour','The startHour is mandatory').not().isEmpty(),
    check('endHour','The endHour is mandatory').not().isEmpty(),
    validateFields
], updateWorkshift);

router.post('/delete',[
    check('workshiftId','The workshiftId is undefined'),
    validateFields
], deleteWorkshift);

module.exports = router;