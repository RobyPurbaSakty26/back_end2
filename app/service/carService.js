const carRepository = require('../repository/carRepository');

module.exports = {
  async list() {
    try {
      const car = await carRepository.getAll();
      const total = await carRepository.getTotalCount();

      return {
        data: car,
        count: total,
      };
    } catch (err) {
      throw err;
    }
  },

  create(body) {
    return carRepository.create(body);
  },
  update(body, id) {
    return carRepository.update(body, id);
  },

  delete(id) {
    return carRepository.delete(id);
  },
  getDetail(id) {
    return carRepository.getById(id);
  },
};
