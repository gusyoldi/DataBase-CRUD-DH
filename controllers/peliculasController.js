const db = require('../database/models');

const peliculasController = {
    createForm: function (req, res) {
        db.Genero.findAll()
            .then(function(genres) {
                return res.render('createMovie', {genres})
            })
    },
    storeMovie: function (req, res) {
        db.Pelicula.create({
            title: req.body.title,
            awards: req.body.awards,
            length: req.body.length,
            rating: req.body.rating,
            release_date: req.body.release_date,
            genre_id: req.body.genre
        });
        res.redirect('/peliculas')
    },
    listMovies: function (req, res) {
        db.Pelicula.findAll()
            .then(function(movies) {
                return res.render('listMovies', {movies})
            })
    },
    detail: function(req, res) {
        db.Pelicula.findByPk(req.params.id, {
            include:[
                {association: 'actores'},
                {association: 'genero'}
            ]})
            .then(function (movie){
                return res.render('detailMovie', {movie})
            })
    },
    editForm: function(req, res) {
        let findMovie = db.Pelicula.findByPk(req.params.id);
        let findGenres = db.Genero.findAll();

        Promise.all([findMovie, findGenres]).then(function([movie, genres]){

            return res.render('editMovie', {movie, genres})
        })

    },
    updateMovie: function(req, res) {
        db.Pelicula.update({
            title: req.body.title,
            awards: req.body.awards,
            length: req.body.length,
            rating: req.body.rating,
            release_date: req.body.release_date,
            genre_id: req.body.genre
        }, {
            where: {
                id: req.params.id}
        });
        return res.redirect('/peliculas/' + req.params.id)
    },
    deleteMovie: function(req, res) {
       db.Pelicula.destroy({
        where: {
            id: req.params.id
        }
       })

       return res.redirect('/peliculas')
    }
};

module.exports = peliculasController;