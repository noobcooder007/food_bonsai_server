const { Schema, model } = require("mongoose");

const MethodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

MethodSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Method', MethodSchema);