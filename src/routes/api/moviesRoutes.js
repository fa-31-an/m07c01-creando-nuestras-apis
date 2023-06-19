const express = require('express');
const router = express.Router();
const moviesController = require('../../controllers/api/moviesController');

router
    .get('/api/movies', moviesController.list)
    .get('/api/movies/details/:id', moviesController.detail)
    .post('/api/movies/create', moviesController.addMovie)
    .delete('/api/movies/delete/:id', moviesController.destroy)

module.exports = router;