/*
    path: /api/address
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getCountries, createCountry, getStates, createState, getCities, createCity, getCountryById, getStateById, getCityById, updateCountry, updateState, updateCity, deleteCountry, deleteState, deleteCity } = require('../controllers/address');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/countries',
validateJWT,
getCountries);

router.get('/:countryId',
validateJWT,
getCountryById);

router.post('/country',[
    check('name','The name is mandatory').not().isEmpty(),
    check('shortname','The shortname is mandatory and length is max 3 and min 2').isLength({max: 3, min: 2}),
    validateFields
], createCountry);

router.post('/country/update',[
    check('countryId','The countryId is mandatory').not().isEmpty(),
    check('name','The name is mandatory').not().isEmpty(),
    check('shortname','The shortname is mandatory').not().isEmpty(),
    validateFields
], updateCountry);

router.post('/country/delete',[
    check('countryId','The countryId is undefined').not().isEmpty(),
    validateFields
], deleteCountry);

router.get('/states',
validateJWT,
getStates);

router.get('/:stateId',
validateJWT,
getStateById);

router.post('/state',[
    check('name','The name is mandatory').not().isEmpty(),
    check('shortname','The shortname is mandatory and length is max 5 and min 2').isLength({min: 2, max: 5}),
    check('country','The country is mandatory').not().isEmpty(),
    validateFields
], createState);

router.post('/state/update',[
    check('stateId','The stateId is undefined').not().isEmpty(),
    check('name','The name is mandatory').not().isEmpty(),
    check('shortname','The shortname is mandatory').not().isEmpty(),
    check('country','The country is mandatory').not().isEmpty(),
    validateFields
], updateState);

router.post('/state/delete',[
    check('stateId','The stateId is undefined').not().isEmpty(),
    validateFields
], deleteState);

router.get('/cities',
validateJWT,
getCities);

router.get('/:cityId',
validateJWT,
getCityById);

router.post('/city',[
    check('name','The name is mandatory').not().isEmpty(),
    check('shortname','The shortname is mandatory and is length is max 15 and min 2').isLength({max: 15, min: 2}),
    check('state','The state is mandatory').not().isEmpty(),
    validateFields
], createCity);

router.post('/city/update',[
    check('cityId','The cityId is undefined').not().isEmpty(),
    check('name','The name is mandatory').not().isEmpty(),
    check('shortname','The shortname is mandatory').not().isEmpty(),
    check('state','The state is mandatory').not().isEmpty(),
    validateFields
], updateCity);

router.post('/city/delete',[
    check('cityId','The cityId is undefined').not().isEmpty(),
    validateFields
], deleteCity);

module.exports = router;