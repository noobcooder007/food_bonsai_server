const { Schema, model } = require("mongoose");


const WorkshiftSchema = Schema({
    name: {
        type: String,
        required: true
    },
    startHour: {
        type: String,
        required: true
    },
    endHour: {
        type: String,
        required: true
    },
    workers: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
} ,{
    timestamp: true
});

WorkshiftSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Workshift', WorkshiftSchema);