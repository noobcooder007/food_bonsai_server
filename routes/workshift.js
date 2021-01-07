/*
    path: /api/workshift
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getWorkshifts, createWorkshift } = require("../controllers/workshift");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.get('/',
validateJWT,
getWorkshifts);

router.post('/new',[
    check('name','The name is mandatory').not().isEmpty(),
    check('startHour','The start hour is mandatory').isLength({min: 5, max: 5}),
    check('endHour','The end hour is mandatory').isLength({min: 5, max: 5}),
    validateFields
], createWorkshift);

module.exports = router;