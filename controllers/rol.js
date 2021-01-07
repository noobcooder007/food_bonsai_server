const { response } = require('express');
const Rol = require('../models/rol');

const getRoles = async (req, res = response) => {
    const roles = await Rol.find();
    res.json({
        ok: true,
        roles
    });
}

const getRolById = async (req, res = response) => {
    const rol = await Rol.findById(req.params.rolId);
    res.json({
        ok: true,
        rol
    });
}

const createRol = async (req, res = response) => {
    try {
        const rol = new Rol(req.body);
        rol.save();
        res.json({
            ok: true,
            rol
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        });
    }
}

const updateRol = async (req, res = response) => {
    const rol = Rol.updateOne({_id: req.body.rolId}, { $set: { "name": req.body.name, "permits.user": req.body.user, "permits.inventory": req.body.inventory, "permits.cash": req.body.cash, "permits.table": req.body.table, "permits.expenses": req.body.expenses, "permits.clients": req.body.clients, "permits.providers": req.body.providers, "permits.movements": req.body.movements } });
}

const deleteRol = async (req, res = response) => {
    try {
        const rol = await Rol.deleteOne({_id: req.body.rolId});
        res.json({
            ok: true,
            rol
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "Something went wrong"
        });
    }
}

module.exports = {
    getRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol
}