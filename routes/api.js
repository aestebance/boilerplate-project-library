/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';
let mongodb = require('mongodb');
let mongoose = require('mongoose');

module.exports = function (app) {

  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  let bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    comments: [String],
    commentcount: Number
  });

  let Book = mongoose.model('Book', bookSchema);

  app.route('/api/books')
    .get(function (req, res){
      Book.find({}, (error, result) => {
        if (!error && result) {
          return res.json(result);
        }
      });
    })

    .post(function (req, res){
      if (!req.body.title) {
        return res.send('missing required field title');
      }

      let newBook = new Book({
        title: req.body.title,
        comments: [],
        commentcount: 0
      });

      newBook.save((error, savedBook) => {
        if (!error && savedBook) {
          return res.json(savedBook);
        }
      });
    })

    .delete(function(req, res){
      Book.deleteMany({}, (error, result) => {
        if (!error) {
          return res.send('complete delete successful');
        }
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      Book.findById(bookid, (error, result) => {
        if (!error && result) {
          return res.json(result);
        } else {
          return res.send('no book exists');
        }
      });
    })

    .post(function(req, res){
      let bookid = req.params.id;
      if (!req.body.comment) {
        return res.send('missing required field comment');
      }

      let comment = req.body.comment;
      Book.updateOne({ _id: bookid }, {$addToSet: { comments: [comment]}}, (error, result) => {
        if (!error && result) {
          return res.json(result);
        } else {
          return res.send('no book exists');
        }
      });
    })

    .delete(function(req, res){
      let bookid = req.params.id;
      Book.deleteOne({_id: bookid}, (error, result) => {
        if (!error) {
          return res.send('delete successful');
        }
        else {
          return res.send('no book exists');
        }
      })
    });
};
