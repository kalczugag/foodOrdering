module.exports = (req, res, next) => {
    if (req.user && req.user.admin) {
        next();
    } else {
        return res.status(401).send({ error: "Insufficient permission!" });
    }
};
