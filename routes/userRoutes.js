const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { userModel } = require("../models/userModel");

const router = express.Router()

router.post("/signup", async (req, res) => {
    const { name, age, email, password } = req.body;
    try {
        const isUser = await userModel.findOne({ email })

        if (isUser) {
            res.status(200).send({
                ok: true,
                msg: 'User already Exists, Log-In'
            })
        } else {
            bcrypt.hash(password, 3, async (err, hashed) => {
                const data = new userModel({ name, age, email, password: hashed });
                await data.save();
                res.status(200).send({
                    ok: true,
                    msg: 'Signup Sucessfully'
                })
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            ok: false,
            msg: 'Something wrong in signup'
        })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const payloadUser = {
                        userID: user._id,
                        name: user.name
                    }
                    const token = jwt.sign(payloadUser, "masai", { expiresIn: '24h' });
                    res.cookie('token', token)
                    res.send({
                        ok: true,
                        msg: "login Sucessfully",
                    })
                } else {
                    res.status(401).send({
                        ok: false,
                        msg: 'Wrong Credentials'
                    })
                }
            })
        } else {
            res.status(401).send({
                ok: false,
                msg: 'User not found, Plz Sign-up first'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            ok: false,
            msg: 'Something wrong in login'
        })
    }
})

router.get('/logout', async (req, res) => {
    try {
        const token = req.cookies['token']
        if (token) {
            res.clearCookie('token');
            res.status(200).send({
                ok: true,
                msg: 'log-out Sucessfully'
            })
        } else {
            res.status(401).send({
                ok: false,
                msg: 'Plz Login first'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            ok: false,
            msg: 'Something wrong in logout'
        })
    }
})


module.exports = router