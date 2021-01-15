const { Schema, model } = require("mongoose");


const ArchingSchema = new Schema({
    cash: {
        type: Schema.Types.ObjectId,
        ref: 'Cash'
    },
    date: {
        type: Date,
        default: Date.now
    },
    initialMoney: {
        type: Number,
        required: true
    },
    finalMoney: {
        type: Number,
        required: true
    },
    gain: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

ArchingSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Arching', ArchingSchema);