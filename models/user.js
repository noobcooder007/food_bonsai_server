const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    contact: {
        phone: {
            type: Array,
            of: Number
        },
        address: {
            street: {
                type: String,
                required: true
            },
            number: {
                type: Number,
                required: true
            },
            cp: {
                type: Number,
                required: true
            },
            city: {
                type: Schema.Types.ObjectId,
                ref: 'City',
                required: true
            }
        }
    },
    access: {
        level: {
            type: Number,
            required: true
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: 'Rol',
            required: true
        }
    },
    workshift: {
        type: Schema.Types.ObjectId,
        ref: 'Workshift',
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

UserSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('User', UserSchema);