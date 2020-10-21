const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password,12)
    })
    .then(user => {
        const token = jwt.sign({ id: user.id, email: user.email}, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            user: user,
            message: 'user created successfully',
            sessionToken: token
        });
    })
    .catch(err => res.status(500).json({error:err}));
});


router.post('/user/login', (req, res) => {
    User.findOne({ where: { email: req.body.user.email }})
    .then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, matches) => {
                if (matches) {
                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                        expiresIn: '7d'});
                res.status(200).json({
                    user: user,
                    message: "user succesfully authenticated",
                    sessionToken: token
                })
                } else {
                    res.status.json({ error: "password incorrect" })
                }
            })
        } else {
            res.status(500).json({error: "user does not exist" })
        }
    })
    .catch(err => res.status(500).json({ error: "database error" }));
});


module.exports = router;