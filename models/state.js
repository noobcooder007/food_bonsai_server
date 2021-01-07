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

StateSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('State', StateSchema);