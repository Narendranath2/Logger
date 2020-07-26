const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mkdirp = require('mkdirp');
const { check, validationResult } = require('express-validator');
const fs = require('fs');

//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


//Log endpoint
app.post('/log', [
    check('from').not().isEmpty(),
    check('data').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const dataToBeWritten = req.body.data;
    const dir = path.join(__dirname + '/logs/');    
    mkdirp.sync(dir);
    const filePath = dir + "log_" + req.query.from;
    fs.appendFile(filePath, dataToBeWritten + "\n", (err) => {
        if (err) {
            console.log("LOG_WRITE_FAIL")
            console.error(err);
            res.status(200).json({ msg: "LOG_WRITE_FAIL" });
        } else {
            console.log('LOG_WRITE_SUCCESS');
            res.status(200).json({ msg: "LOG_WRITE_SUCCESS" });
        }
    });
});

module.exports = app;