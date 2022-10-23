const bcrypt = require('bcryptjs');
const authService = require('../../../service/authService');
module.exports = {
  register(req, res) {
    const { name, password, email } = req.body;
    authService
      .register(name, password, email)
      .then((user) => {
        res.status(201).json({
          status: 'OK',
          data: user,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'FAIL',
          message: err,
        });
      });
  },

  adminRegister(req, res) {
    const { name, password, email } = req.body;
    authService
      .adminRegister(name, password, email)
      .then((user) => {
        res.status(201).json({
          status: 'OK',
          data: user,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'FAIL',
          message: err,
        });
      });
  },

  login(req, res) {
    const { email, password } = req.body;
    authService
      .login(email, password)
      .then((auth) => {
        if (!auth) {
          res.status(401).json({
            status: 'Fail1',
            message: 'Emalil and Password Fail',
          });
        }
        res.status(200).json({
          status: 'OK',
          data: auth,
        });
      })
      .catch((err) => {
        res.status(401).json({
          status: 'Fail',
          message: err.message,
        });
      });
  },
  async getAll(req, res) {
    try {
      const users = await authService.list();
      res.status(200).json({
        status: 'OK',
        data: users.data,
        count: users.count,
      });
    } catch (err) {
      res.status(401).json({
        status: 'Fail',
        message: err.message,
      });
    }
  },
  async authorize(req, res, nex) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      res.status(403).json({
        message: 'Unauthorize1',
      });
      return;
    }
    const token = bearerToken.split('Bearer ')[1];
    authService
      .authorize(token)
      .then((user) => {
        if (!user) {
          res.status(402).json({
            message: 'Unauthorize2',
          });
          return;
        }
        req.user = user;
        nex();
      })
      .catch((err) => {
        res.status(401).json({
          message: 'Unauthorize3',
        });
      });
  },
  whoAmI(req, res) {
    const user = req.user;

    res.status(201).json({
      status: 'OK',
      data: user,
    });
  },
  adminOrSuperAdmin(req, res, nex) {
    const user = req.user;
    const role = user.role;
    const isAdminORSuperAdmin = role === 'Admin' || role == 'SuperAdmin';
    if (!isAdminORSuperAdmin) {
      res.status(402).json({
        message: 'You are not admin or super admin',
      });
      return;
    }
    nex();
  },

  SuperAdmin(req, res, nex) {
    const user = req.user;
    const role = user.role;
    const isAdminORSuperAdmin = role === 'SuperAdmin';
    if (!isAdminORSuperAdmin) {
      res.status(402).json({
        message: 'You are not Super admin',
      });
      return;
    }
    nex();
  },

  async update(req, res) {
    try {
      const body = req.body;
      const id = req.params.id;

      const user = await authService.update(body, id);
      res.status(201).json({
        status: 'OK',
        data: user,
      });
    } catch (err) {
      res.status(400).json({
        status: 'Fail',
        message: err.message,
      });
    }
  },
  async getDetail(req, res) {
    try {
      const id = req.params.id;
      const user = await authService.getDetail(id);
      res.status(201).json({
        status: 'OK',
        data: user,
      });
    } catch (err) {
      res.status(401).json({
        status: 'Fail ini',
        message: err.message,
      });
    }
  },
  async delete(req, res) {
    try {
      const id = req.params.id;
      const user = await authService.delete(id);
      res.status(201).end();
    } catch (err) {
      res.status(401).json({
        status: 'Fail',
        message: err.message,
      });
    }
  },
};
