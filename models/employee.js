const {model, Schema} = require('mongoose')

const employeeSchema = new Schema ({
    document: {
        type: String,
        unique: true,
        required: [true, 'the document is required']
    },
    names: {
        type: String,
        required: [true, 'the name is required']
    },
    entryDate: {
        type: Date,
        required: [true, 'the date is required']
    },
    withdrawalDate: {
        type: Date,
    },
    salary: {
        type: Number,
        required: [true, 'the salary is required']
    },
    daysWorked: {
        type: Number,
        required: [true, 'the days worked is required']
    },
    layoffs: {
        type: String
    }
})

employeeSchema.set('toJSON', {
    versionKey: false
})

module.exports = model('Employee', employeeSchema, 'employees')