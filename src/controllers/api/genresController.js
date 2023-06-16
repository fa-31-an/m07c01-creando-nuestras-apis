const db = require('../../database/models');
const sequelize = db.sequelize;


const genresController = {
    list: (req, res) => {
        db.Genre.findAll()
            .then(genres => {
                const RESPONSE = {
                    meta: {
                        status: 200,
                        total: genres.length,
                        url: "/genres",
                    },
                    data: genres,
                }
                res.json(RESPONSE)
            })
    },
    detail: (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                const RESPONSE = {
                    meta: {
                        status: 200,
                        endpoint: "/api/genres/detail/"
                    },
                    data: genre,
                }
                res.json(RESPONSE)
            });
    },
};

module.exports = genresController;