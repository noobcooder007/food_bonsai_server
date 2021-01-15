const { response } = require("express");
const Cash = require('../models/cash');
const Arching = require('../models/arching');

const getCashes = async (req, res = response) => {
    const cashes = await Cash.find();
    res.json({
        ok: true,
        cashes
    });
}

const getCashById = async (req, res = response) => {
    const cash = await Cash.findById(req.params.cashId);
    res.json({
        ok: true,
        cash
    });
}

const createCash = async (req, res = response) => {
    try {
        const cash = new Cash(req.body);
        await cash.save();
        res.json({
            ok: true,
            cash
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

const updateCash = async (req, res = response) => {
    try {
        const cash = await Cash.updateOne({_id: req.body.cashId}, { $set: { "name": req.body.name, "description": req.body.description, "cashier": req.body.cashier } });
        res.json({
            ok: true,
            cash
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

const deleteCash = async (req, res = response) => {
    try {
        const cash = await Cash.updateOne({_id: req.body.cashId}, { $set: { "status": false } });
        res.json({
            ok: true,
            cash
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

const openCash = async (req, res = response) => {
    try {
        const cash = await Cash.updateOne({_id: req.body.cashId}, { $set: { "opened": true } });
        const arching = new Arching(req.body);
        arching.date = new Date(arching.date).toISOString();
        await arching.save();
        res.json({
            ok: true,
            cash,
            arching
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

const closeCash = async (req, res = response) => {
    try {
        const cash = await Cash.updateOne({_id: req.body.cashId}, { $set: { "opened": false } });
        const arching = await Arching.findById({_id: req.body.archingId});
        arching.gain = req.body.finalMoney - arching.initialMoney;
        arching.finalMoney = req.body.finalMoney;
        await arching.save();
        res.json({
            ok: true,
            cash,
            arching
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

const getArchings = async (req, res = response) => {
    const archings = await Arching.find();
    res.json({
        ok: true,
        archings
    });
}

const getArchingById = async (req, res = response) => {
    const arching = await Arching.findById(req.params.archingId);
    res.json({
        ok: true,
        arching
    });
}

const updateArching = async (req, res = response) => {
    try {
        const arching = await Arching.findById(req.body.archingId);
        arching.initialMoney = req.body.initialMoney;
        arching.finalMoney = req.body.finalMoney;
        arching.gain = req.body.finalMoney - req.body.initialMoney;
        arching.save();
        res.json({
            ok: true,
            arching
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

const deleteArching = async (req, res = response) => {
    try {
        const arching = await Arching.deleteOne({_id: req.body.archingId});
        res.json({
            ok: true,
            arching
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

module.exports = {
    getCashes,
    getCashById,
    createCash,
    updateCash,
    deleteCash,
    openCash,
    closeCash,
    getArchings,
    getArchingById,
    updateArching,
    deleteArching
}