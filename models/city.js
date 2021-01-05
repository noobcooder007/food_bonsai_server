const { Schema, model } = require('mongoose');

const CitySchema = Schema({
    name: {
        type: String,
        required: true
    },
    shortname: {
        type: String,
        required: true
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: 'State',
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

module.exports = model('City', CitySchema);