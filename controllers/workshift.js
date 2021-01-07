const { response } = require("express");
const Workshift = require('../models/workshift');


const getWorkshifts = async (req, res = response) => {
    const workshifts = await Workshift.find();
    res.json({
        ok: true,
        workshifts
    });
}

const getWorkshiftById = async (req, res = response) => {
    const workshift = await Workshift.findById(req.params.workshiftId);
    res.json({
        ok: true,
        workshift
    });
}

const createWorkshift = async (req, res = response) => {
    try {
        const workshift = new Workshift(req.body);
        await workshift.save();
        res.json({
            ok: true,
            workshift
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        });
    }
}

const updateWorkshift = async (req, res = response) => {
    try {
        const workshift = await Workshift.updateOne({_id: req.body.workshiftId}, { $set: { "name": req.body.name, "startHour": req.body.startHour, "endHour": req.body.endHour } });
        res.json({
            ok: true,
            workshift
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "something went wrong"
        });
    }
}

const deleteWorkshift = async (req, res = response) => {
    try {
        const workshift = await Workshift.deleteOne({_id: req.body.workshiftId});
        res.json({
            ok: true,
            workshift
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

module.exports = {
    getWorkshifts,
    getWorkshiftById,
    createWorkshift,
    updateWorkshift,
    deleteWorkshift
}