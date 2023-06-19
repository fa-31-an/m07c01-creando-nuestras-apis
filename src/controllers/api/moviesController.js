const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    destroy: function (req, res) {
        let movieId = req.params.id;
        Movies
            .destroy({ where: { id: movieId }, force: true }) // force: true es para asegurar que se ejecute la acción
            .then(() => {
                return res.status(201).json({
                    meta: {
                        status: 200,
                        msg: "movie correctly deleted",
                    },
                })
            })
            .catch(error => res.send(error))
    },
    list: (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                const RESPONSE = {
                    meta: {
                        status: 200,
                        total: movies.length,
                        url: "/movies",
                    },
                    data: movies,
                }
                res.json(RESPONSE)
            })
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                const RESPONSE = {
                    meta: {
                        status: 200,
                        endpoint: "/api/movies/detail/"
                    },
                    data: movie,
                }
                res.json(RESPONSE)
            });
    },
    addMovie: async (req, res) => {
        try {
            // return console.log(req.body);
            let newMovie = await Movies.create({ ...req.body })

            return res.status(200).json({
                meta: {
                    status: 200,
                    msg: "Movie added correctly",
                    endpoint: `/api/movies/${newMovie.id}`
                },
                newMovie,
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                meta: {
                    status: 500,
                    msg: "Internal server error"
                }
            })
        }
    },
}

module.exports = moviesController;