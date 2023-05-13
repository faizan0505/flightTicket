const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.cookies['token']
    if (token) {
        const decoded = jwt.verify(token, "masai")
        if (decoded) {
            req.body.userID = decoded.userID
            req.body.name = decoded.name
            next()
        } else {
            res.status(401).send({
                ok: false,
                msg: "Please Log-in First"
            })
        }
    } else {
        res.status(401).send({
            ok: false,
            msg: "Please Log-in First"
        })
    }
}

module.exports = { authenticate }