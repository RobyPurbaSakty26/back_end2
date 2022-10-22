const { User } = require('../models');

module.exports = {
  create(body) {
    return User.create(body);
  },

  findUser(condition) {
    return User.findOne({ where: condition });
  },

  findUserByPk(id) {
    return User.findByPk(id);
  },

  getAll() {
    return User.findAll();
  },

  update(body, id) {
    return User.update(body, { where: { id } });
  },

  getTotalCount() {
    return User.count();
  },

  delete(id) {
    return User.destroy({ where: { id } });
  },
};
