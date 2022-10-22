const express = require('express');
const app = express();
const port = 9000;
const { Car } = require('./app/models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create
app.post('/cars', (req, res) => {
  const body = req.body;
  Car.create(body)
    .then((car) => {
      res.status(200).json({ data: car });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// get all
app.get('/cars', (req, res) => {
  Car.findAll()
    .then((cars) => {
      res.status(200).json({ data: cars });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// get by id
app.get('/cars/:id', (req, res) => {
  const id = req.params.id;
  Car.findByPk(id)
    .then((car) => {
      res.status(200).json({ data: car });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// update
app.put('/cars/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;

  Car.update(body, { where: { id: id } })
    .then((data) => {
      res.status(200).json({ data: data });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// delete
app.delete('/cars/:id', (req, res) => {
  const id = req.params.id;

  Car.destroy({ where: { id: id } })
    .then((car) => {
      res.status(200).json({ data: car });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
