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
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
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
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })

    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });

};
