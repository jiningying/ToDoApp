const mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // name: {
    //     firstName: {
    //         type: String,
    //         required: true
    //     },
    //     lastName: String
    // },
    taskName : String,

    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    },
    dueDate :{
        type: Date
    },
    taskStatus: {
        type: String,
        validate: {
            validator: function (status) {
                return status === "InProgress" || status === "Complete";
            },
            message: 'Task status should be either InProgress or Complete'
        }
    },
    taskDesc : String
    //   age     : { type: Number, min: 5, max: 20 },
    // created: {
    //     type: Date,
    //     default: Date.now
    // }
});

module.exports = mongoose.model('Task', taskSchema);