// Accedo all'oggetto dispatcher
let dispatcher = require('./dispatcher');
let mysql = require('mysql');
let header = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  'Content-Type': 'text/plain'
};

dispatcher.addListener("GET", "/api/getFilms", function (req, res) {
  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pulp"
  });
  con.connect(function (err) {
    header['Content-Type'] = 'application/json';
    res.writeHead(200, header);

    if (!err) {
      con.query("SELECT * FROM film", function (errQprod, resultQprod) {
        if (!errQprod) {
          res.end(JSON.stringify(resultQprod));
        } else {
          res.writeHead(500);
          res.end(JSON.stringify("ERRORE QUERY"));
        }
      });
    } else {
      res.writeHead(500);
      res.end(JSON.stringify("ERRORE CONNESSIONE"));
    }
    con.end();
  });

});

dispatcher.addListener("POST", "/api/getDettaglioFilm", function (req, res) {
  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pulp"
  });
  con.connect(function (err) {
    header['Content-Type'] = 'application/json';
    res.writeHead(200, header);
    if (!err) {
      const query = `SELECT *
                     FROM film
                     WHERE id_film = ${req["post"].id_film}`;
      con.query(query, function (errQ, resultQ) {
        if (!errQ) {
          res.end(JSON.stringify(resultQ));
        } else {
          res.writeHead(500);
          res.end(JSON.stringify("ERRORE QUERY"));
        }
      });
    } else {
      res.writeHead(500);
      res.end(JSON.stringify("ERRORE CONNESSIONE"));
    }
    con.end();
  });
});

dispatcher.addListener("POST", "/api/getProiezioniFilm", function (req, res) {
  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pulp"
  });
  con.connect(function (err) {
    header['Content-Type'] = 'application/json';
    res.writeHead(200, header);
    if (!err) {
      const query = `SELECT proiezioni.*, sale.nome AS sala_nome
                     FROM proiezioni
                            INNER JOIN sale ON proiezioni.id_sala = sale.id_sala
                     WHERE proiezioni.id_film = ${req["post"].id_film}`;
      con.query(query, function (errQ, resultQ) {
        if (!errQ) {
          res.end(JSON.stringify(resultQ));
        } else {
          res.writeHead(500);
          res.end(JSON.stringify("ERRORE QUERY"));
        }
      });
    } else {
      res.writeHead(500);
      res.end(JSON.stringify("ERRORE CONNESSIONE"));
    }
    con.end();
  });
});

dispatcher.addListener("POST", "/api/getSalaFilm", function (req, res) {
  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pulp"
  });
  con.connect(function (err) {
    header['Content-Type'] = 'application/json';
    res.writeHead(200, header);
    if (!err) {
      const query = `SELECT *
                     FROM sale
                     WHERE id_sala = ${req["post"].id_sala}`;
      con.query(query, function (errQ, resultQ) {
        if (!errQ) {
          res.end(JSON.stringify(resultQ));
        } else {
          res.writeHead(500);
          res.end(JSON.stringify("ERRORE QUERY"));
        }
      });
    } else {
      res.writeHead(500);
      res.end(JSON.stringify("ERRORE CONNESSIONE"));
    }
    con.end();
  });
});

dispatcher.addListener("POST", "/api/getProiezione", function (req, res) {
  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pulp"
  });
  con.connect(function (err) {
    header['Content-Type'] = 'application/json';
    res.writeHead(200, header);
    if (!err) {
      const query = `SELECT *
                     FROM proiezioni
                     WHERE id_proiezione = ${req["post"].id_proiezione}`;
      con.query(query, function (errQ, resultQ) {
        if (!errQ) {
          res.end(JSON.stringify(resultQ));
        } else {
          res.writeHead(500);
          res.end(JSON.stringify("ERRORE QUERY"));
        }
      });
    } else {
      res.writeHead(500);
      res.end(JSON.stringify("ERRORE CONNESSIONE"));
    }
    con.end();
  });
});

dispatcher.addListener("POST", "/api/getPrenotazioniProiezione", function (req, res) {
  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pulp"
  });
  con.connect(function (err) {
    header['Content-Type'] = 'application/json';
    res.writeHead(200, header);
    if (!err) {
      const query = `SELECT *
                     FROM prenotazioni
                     WHERE id_proiezione = ${req["post"].id_proiezione}`;
      con.query(query, function (errQ, resultQ) {
        if (!errQ) {
          res.end(JSON.stringify(resultQ));
        } else {
          res.writeHead(500);
          res.end(JSON.stringify("ERRORE QUERY"));
        }
      });
    } else {
      res.writeHead(500);
      res.end(JSON.stringify("ERRORE CONNESSIONE"));
    }
    con.end();
  });
});

dispatcher.addListener("POST", "/api/sign_up", function (req, res) {
  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pulp"
  });
  con.connect(function (err) {
    header['Content-Type'] = 'application/json';
    res.writeHead(200, header);
    if (!err) {
      const query = `INSERT INTO utenti (nome, cognome, email, password) VALUES (?, ?, ?, ?)`;
      con.query(query, [req["post"].nome, req["post"].cognome, req["post"].email, req["post"].password], function (errQ, resultQ) {
        if (!errQ) {
          res.end(JSON.stringify(resultQ));
        } else {
          res.writeHead(500);
          res.end(JSON.stringify("ERRORE QUERY"));
        }
      });
    } else {
      res.writeHead(500);
      res.end(JSON.stringify("ERRORE CONNESSIONE"));
    }
    con.end();
  });
});

dispatcher.addListener("POST", "/api/login", function (req, res) {
  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pulp"
  });
  con.connect(function (err) {
    header['Content-Type'] = 'application/json';
    res.writeHead(200, header);
    if (!err) {
      const query = `SELECT * FROM utenti WHERE email = ? AND password = ?`;
      con.query(query, [req["post"].email, req["post"].password], function (errQ, resultQ) {
        if (!errQ) {
          res.end(JSON.stringify(resultQ));
        } else {
          res.writeHead(500);
          res.end(JSON.stringify("ERRORE QUERY"));
        }
      });
    } else {
      res.writeHead(500);
      res.end(JSON.stringify("ERRORE CONNESSIONE"));
    }
    con.end();
  });
});

dispatcher.addListener("POST", "/api/inserisciPrenotazione", function (req, res) {
  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pulp"
  });

  con.connect(function (err) {
    header['Content-Type'] = 'application/json';
    res.writeHead(200, header);
    if (!err) {
      const query = `INSERT INTO prenotazioni (id_proiezione, id_utente, posti_prenotati) VALUES (?, ?, ?)`;
      con.query(query, [req["post"].proiezione, req["post"].utente, req["post"].posti], function (errQ, resultQ) {
        if (!errQ) {
          res.end(JSON.stringify(resultQ));
        } else {
          res.writeHead(500);
          res.end(JSON.stringify("ERRORE QUERY"));
        }
      });
    } else {
      res.writeHead(500);
      res.end(JSON.stringify("ERRORE CONNESSIONE"));
    }
    con.end();
  });
});


/* ********************************************************************** */
var http = require("http");
http.createServer(function (request, response) {
  dispatcher.dispatch(request, response);
}).listen(8888);
console.log('Server running on port 8888...');
dispatcher.showList();
