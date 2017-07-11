var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

var lists = [
  {
    id: 1,
    listName: 'Todo'
  },
  {
    id: 2,
    listName: 'Doing'
  },
  {
    id: 3,
    listName: 'Done'
  }
];

var cards = [
  {
    id: 1,
    description: 'Fix bug in player',
    list_id: 1
  },
  {
    id: 2,
    description: 'Add feature with D3',
    list_id: 2
  },
  {
    id: 3,
    description: 'Learn AngularJS',
    list_id: 3
  }
];

app.get('/lists', function (req, res) {
  res.send(lists);
});

app.get('/cards', function (req, res) {
  res.send(cards);
});

app.post('/lists', function (req, res) {
  var list = {id: req.body.id, listName: req.body.listName};
  lists.push(list);
  res.send(list);
});

app.post('/cards', function (req, res) {
  var card = {id: req.body.id, description: req.body.description, list_id: req.body.list_id};
  cards.push(card);
  res.send(card);
});

app.delete('/listDelete/:id', function (req, res) {
  lists = lists.filter (function (list) {
    return list.id != Number (req.params.id);
  });
  res.sendStatus (200);
});

app.delete('/cardDelete/:id', function (req, res) {
  cards = cards.filter (function (card) {
    return card.id != Number (req.params.id);
  });
  res.sendStatus (200);
});

app.put ('/cards/:id', function (req, res) {
  var card = cards.find (function (card) {
    return card.id == Number(req.params.id);
  });
  card.description = req.body.description;
  card.list_id = req.body.list_id;
  res.sendStatus (200);
});

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('backend started');
});