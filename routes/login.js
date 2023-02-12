const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.render("login", { tituloWeb: "Inicio de sesión" });
});

module.exports = router;