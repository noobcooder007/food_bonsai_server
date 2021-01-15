const { response } = require("express");
const Method = require('../models/method');

const getMethods = async (req, res = response) => {
    const methods = await Method.find();
    res.json({
        ok: true,
        methods
    });
}

const getMethodsById = async (req, res = response) => {
    const method = await Method.findById(req.params.methodId);
    res.json({
        ok: true,
        method
    });
}

const createMethod = async (req, res = response) => {
    try {
        const method = new Method(req.body);
        await method.save();
        res.json({
            ok: true,
            method
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "something went wrong"
        });
    }
}

const updateMethod = async (req, res = response) => {
    try {
        const method = await Method.updateOne({_id: req.body.methodId}, { $set: { "name": req.body.name, "description": req.body.description } });
        res.json({
            ok: true,
            method
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "Something went wrong"
        });
    }
}

const deleteMethod = async (req, res = response) => {
    try {
        const method = await Method.deleteOne({_id: req.body.methodId});
        res.json({
            ok: true,
            method
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

module.exports = {
    getMethods,
    getMethodsById,
    createMethod,
    updateMethod,
    deleteMethod
}