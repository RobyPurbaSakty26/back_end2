/**
 * @file contains request handler of post resource
 * @author Fikri Rahmat Nurhidayat
 */
const carRepository = require('../../../service/carService');

module.exports = {
  async list(req, res) {
    try {
      const cars = await carRepository.list();
      res.status(200).json({
        status: 'OK',
        data: {
          user: cars.data,
          count: cars.count,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async create(req, res) {
    try {
      const body = req.body;
      const users = req.user;
      const user = users.dataValues;
      body.createBy = user.id;
      const car = await carRepository.create(body);
      res.status(201).json({
        status: 'OK',
        data: car,
      });
    } catch (err) {
      res.status(201).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async update(req, res) {
    try {
      const body = req.body;
      const users = req.user;
      const user = users.dataValues;
      body.updateBy = user.id;
      const car = await carRepository.update(body, req.params.id);
      res.status(200).json({
        status: 'OK',
        data: car,
      });
    } catch (err) {
      res.status(422).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async show(req, res) {
    try {
      const users = await carRepository.getDetail(req.params.id);
      res.status(200).json({
        status: 'OK',
        data: users,
      });
    } catch (err) {
      res.status(422).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async destroy(req, res) {
    try {
      const users = req.user;
      const user = users.dataValues;
      const userId = user.id;

      await carRepository.update({ deleteBy: userId }, req.params.id);

      await carRepository.delete(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(422).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },
};
