const { Schema, model } = require('mongoose');

const StateSchema = Schema({
    name: {
        type: String,
        required: true
    },
    shortname: {
        type: String,
        required: true
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    }
}, {
    timestamps: true
});

UserSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('State', StateSchema);