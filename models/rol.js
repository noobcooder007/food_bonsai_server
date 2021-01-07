const { Schema, model } = require("mongoose");

const RolSchema = Schema({
    name: {
        type: String,
        required: true
    },
    permits:{
        user: {
            type: Boolean,
            default: false
        },
        inventory: {
            type: Boolean,
            default: false
        },
        cash: {
            type: Boolean,
            default: false
        },
        table: {
            type: Boolean,
            default: false
        },
        expenses: {
            type: Boolean,
            default: false
        },
        clients: {
            type: Boolean,
            default: false
        },
        providers: {
            type: Boolean,
            default: false
        },
        movements: {
            type: Boolean,
            default: false
        }
    }
}, {
    timestamp: true
});

RolSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Rol', RolSchema);