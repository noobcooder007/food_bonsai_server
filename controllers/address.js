const { response } = require('express');
const Country = require('../models/country');
const State = require('../models/state');
const City = require('../models/city');

const getCountries = async (req, res = response) => {
    const countries = await Country.find();
    res.json({
        ok: true,
        countries
    });
}

const getCountryById = async (req, res = response) => {
    const country = await Country.findById(req.params.countryId);
    res.json({
        ok: true,
        country
    });
}

const createCountry = async (req, res = response) => {
    try {
        const country = new Country(req.body);
        await country.save();
        res.json({
            ok: true,
            country
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        });
    }
}

const updateCountry = async (req, res = response) => {
    try {
        const country = await Country.updateOne({_id: req.body.countryId}, { $set: { "name": req.body.name, "shortname": req.body.shortname } });
        res.json({
            ok: true,
            country
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        });
    }
}

const deleteCountry = async (req, res = response) => {
    try {
        const country = await Country.deleteOne({_id: req.body.countryId});
        res.json({
            ok: true,
            country
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

const getStates = async (req, res = response) => {
    const states = await State.find();
    res.json({
        ok: true,
        states
    });
}

const getStateById = async (req, res = response) => {
    const state = await State.findById(req.params.stateId);
    res.json({
        ok: true,
        state
    });
}

const createState = async (req, res = response) => {
    try {
        const states = new State(req.body);
        await states.save();
        res.json({
            ok: true,
            states
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        });
    }
}

const updateState = async (req, res = response) => {
    try {
        const state = await State.updateOne({_id: req.body.stateId}, { $set: { "name": req.body.name, "shortname": req.body.shortname, "country": req.body.country } });
        res.json({
            ok: true,
            state
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

const deleteState = async (req, res = response) => {
    try {
        const state = await State.deleteOne({_id: req.body.stateId});
        res.json({
            ok: true,
            state
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

const getCities = async (req, res = response) => {
    const cities = await City.find();
    res.json({
        ok: true,
        cities
    });
}

const getCityById = async (req, res = response) => {
    const city = await City.findById(req.params.cityId);
    res.json({
        ok: true,
        city
    });
}

const createCity = async (req, res = response) => {
    try {
        const city = new City(req.body);
        await city.save();
        res.json({
            ok: true,
            city
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        });
    }
}

const updateCity = async (req, res = response) => {
    try {
        const city = City.updateOne({_id: req.body.cityId}, { $set: { "name": req.body.name, "shortname": req.body.shortname, "state": req.body.state } });
        res.json({
            ok: true,
            city
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

const deleteCity = async (req, res = response) => {
    try {
        const city = City.deleteOne({_id: req.body.cityId});
        res.json({
            ok: true,
            city
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

module.exports = {
    getCountries,
    getCountryById,
    createCountry,
    updateCountry,
    deleteCountry,
    getStates,
    getStateById,
    createState,
    updateState,
    deleteState,
    getCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity
}