const bcrypt = require('bcryptjs');
const userRepository = require('../repository/userRepository');
const jwt = require('jsonwebtoken');

async function encryptPassword(str) {
  try {
    const has = await bcrypt.hash(str, 10);
    return has;
  } catch (err) {
    throw err;
  }
}

async function comparePassword(password, encryptPassword) {
  try {
    const isValid = await bcrypt.compare(password, encryptPassword);
    return isValid;
  } catch (err) {
    throw err;
  }
}

const SECRET_KEY = 'Secret';
function createWebToken(payload) {
  return jwt.sign(payload, SECRET_KEY);
}

function verifyWebToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  async register(name, password, email) {
    try {
      const encryptedPassword = await encryptPassword(password);
      const body = {
        name,
        password: encryptedPassword,
        role: 'Member',
        email,
      };
      const user = await userRepository.create(body);

      return user;
    } catch (err) {
      throw err;
    }
  },
  async adminRegister(name, password, email) {
    try {
      const encryptedPassword = await encryptPassword(password);
      const body = {
        name,
        password: encryptedPassword,
        role: 'Admin',
        email,
      };
      const user = await userRepository.create(body);

      return user;
    } catch (err) {
      throw err;
    }
  },
  async login(email, password) {
    try {
      const user = await userRepository.findUser({ email });
      if (!user) {
        return false;
      }

      const { password: encryptedPassword } = user;
      const isAuthenticated = await comparePassword(password, encryptedPassword);

      if (!isAuthenticated) {
        return false;
      }
      //  generate token
      const token = createWebToken({
        id: user.id,
        email: user.email,
      });

      data = {
        ...user.dataValues,
        token,
      };

      return data;
    } catch (err) {
      throw err;
    }
  },
  async list() {
    try {
      const user = await userRepository.getAll();
      const count = await userRepository.getTotalCount();
      return {
        data: user,
        count: count,
      };
    } catch (err) {
      throw err;
    }
  },
  async authorize(token) {
    try {
      const payload = verifyWebToken(token);
      const id = payload.id;
      const user = await userRepository.findUserByPk(id);
      console.log('id', payload);

      return user;
    } catch (err) {
      throw err;
    }
  },

  update(body, id) {
    return userRepository.update(body, id);
  },

  delete(id) {
    return userRepository.delete(id);
  },

  getDetail(id) {
    return userRepository.findUserByPk(id);
  },
};
