const express = require("express");
const { Router } = express;
const router = new Router();
const Contenedor = require("../products/controllers");
const manejadorArchivo = new Contenedor();

router.get("/", async (req, res, next) => {
    const products = await manejadorArchivo.getAll();
    res.render("table.hbs", { products });
});

router.get("/:id", async (req, res, next) => {
    const product = await manejadorArchivo.getById(+req.params.id);
    if (product.length) return res.json(product);
    res.json({ error: "producto no encontrado" });
});

router.post("/", async (req, res, next) => {
    await manejadorArchivo.save(req.body);
    res.redirect("/");
});

router.put("/:id", async (req, res, next) => {
    await manejadorArchivo.updateById(+req.params.id, req.body);
    res.json(req.body);
});

router.delete("/productos/:id", async (req, res, next) => {
    await manejadorArchivo.deleteById(+req.params.id);
    res.send(`Producto ${req.params.id} eliminado`);
});

module.exports = router;