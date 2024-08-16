const Employee = require("../models/employee")

const getEmployees = async (req, res) => {
    const employees = await Employee.find()
    res.json(employees)
}

const getEmployee = async (req, res) => {
    await Employee.findById(req.params.id)
    res.status(200).json()
}

const postEmployee = async (req, res) => {
    try {
        const { 
            document, 
            names, 
            entryDate, 
            withdrawalDate, 
            salary, 
            daysWorked 
        } = req.body

        const layoffs = salary * daysWorked / 360

        const newEmployee = new Employee ({
            document,
            names,
            entryDate,
            withdrawalDate,
            salary,
            daysWorked,
            layoffs
        })
        await newEmployee.save()
        res.status(201).json(newEmployee)
    } catch (error) {
        res.status(404).json({ error : error })
    }
}

const putEmployee = async (req, res) => {
    try {
        const {salary, daysWorked} = req.body
        if (salary !== undefined && daysWorked !== undefined) {
            req.body.layoffs = salary * daysWorked / 360
        }
        const updatedEmployee = await employee.findByIdAndUpdate(req.params.id, req.body, { new : true })
        if(!updatedEmployee) return res.status(404).json({ error: 'Employed not found' })
            res.status(200).json({updatedEmployee})
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

const deleteEmployee = async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id)
    res.status(204).json();
}

module.exports = {
    getEmployees,
    getEmployee,
    postEmployee,
    putEmployee,
    deleteEmployee
}