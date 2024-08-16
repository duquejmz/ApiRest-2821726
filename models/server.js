const express = require('express')
const dbConnect = require('../database/config')
const {getEmployee, postEmployee, putEmployee, deleteEmployee, getEmployees} = require('../controllers/employeeController')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000
        this.host = process.env.HOST || '127.0.0.1'
        this.pathEmployee = '/api-rest'

        this.middlewares()
        this.routes()
        this.dbConnection()
        // this.listen()
    }

    async dbConnection() {
        await dbConnect()
    }

    middlewares() {
        this.app.use(express.json())
    }

    routes() {
        this.app.get(this.pathEmployee, getEmployee),
        this.app.get(this.pathEmployee, getEmployees),
        this.app.post(this.pathEmployee, postEmployee)
        this.app.put(this.pathEmployee+'/:id', putEmployee)
        this.app.delete(this.pathEmployee+'/:id', deleteEmployee)
    }

    listen() {
        this.app.listen(this.port, this.host, () => {
            console.log(`The server is running at http://${host}:${port}`);
        })
    }
}

module.exports = Server