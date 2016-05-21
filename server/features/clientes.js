var express = require('express'),
    rutas = express.Router(),
    db = require('../core/database.js');

// Usados en el api rest angular resource como
rutas.route('/list')
  .get(function (req, res) { // Cliente.query()
    db.query('SELECT * from clientes where estado = 1', function (err, rows) {
      if (err) {
        printLog(err);
        res.status(500).send({code: 500, msg: 'Internal Server Error', dev: err});
      }
      /**
       * Debe devolver {results:{list:[], totalResults:0}}
       * para la paginacin con adap table lite
       */

      res.json({results:{list:rows, totalResults: rows.length}});
    });
  })

  .post(function (req, res) { // Cliente.save()

    db.query('insert into clientes set ?', req.body, function (err, result) {
      if (err) throw err;


      res.json({result: {code: 001, message: 'ok'}});
      console.log(result.insertId);
      // se podria llevar un log en mongo db en el futuro
    })



  });




module.exports = rutas;