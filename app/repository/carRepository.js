const { Car } = require('../models');

module.exports = {
  getAll() {
    return Car.findAll();
  },
  create(body) {
    return Car.create(body);
  },
  update(body, id) {
    return Car.update(body, { where: { id } });
  },
  delete(id) {
    return Car.destroy({ where: { id } });
  },
  getById(id) {
    return Car.findByPk(id);
  },
  getTotalCount() {
    return Car.count();
  },
};
