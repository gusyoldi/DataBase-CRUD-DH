const express = require('express');
const peliculasController = require('../controllers/peliculasController');
const router = express.Router();

router.get("/crear", peliculasController.createForm);
router.post("/crear", peliculasController.storeMovie);
router.get("/", peliculasController.listMovies);
router.get("/:id", peliculasController.detail);
router.get("/editar/:id", peliculasController.editForm);
router.post("/editar/:id", peliculasController.updateMovie);
router.post("/eliminar/:id", peliculasController.deleteMovie);



module.exports = router;