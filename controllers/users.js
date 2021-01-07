const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = async (req, res = response) => {
    const users = await User.find();
    res.json({
        ok: true,
        users
    });
}

const updateUser = async (req, res = response) => {
    try {
        const user = await User.updateOne({_id: req.body.userId}, { $set: { "name": req.body.name, "lastname": req.body.lastname, "contact.phone": req.body.contact.phone, "contact.address.street": req.body.contact.address.street, "contact.address.number": req.body.contact.address.number, "contact.address.cp": req.body.contact.address.cp } });
        res.json({
            ok: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

const updateWorkshift = async (req, res = response) => {
    try {
        const user = await User.updateOne({_id: req.body.userId}, { $set: { "workshift": req.body.workshift } });
        res.json({
            ok: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

const updatePassword = async (req, res = response) => {
    try {
        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(req.body.password, salt);
        const user = await User.updateOne({_id: req.body.userId}, { $set: { "password": password } })
        res.json({
            ok: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

const updateAccess = async (req, res = response) => {
    try {
        const user = await User.updateOne({_id: req.body.userId}, { $set: { "level": req.body.level, "group": req.body.group } });
        res.json({
            ok: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

const deleteUser = async (req, res = response) => {
    try {
        const user = await User.updateOne({_id: req.body.userId}, { $set: { "status": false } });
        res.json({
            ok: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

const activateUser = async (req, res = response) => {
    try {
        const user = await User.updateOne({_id: req.body.userId}, { $set: { "status": true } });
        res.json({
            ok: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something went wrong"
        });
    }
}

module.exports = {
    getUsers,
    updateUser,
    updateWorkshift,
    updatePassword,
    updateAccess,
    deleteUser,
    activateUser
}