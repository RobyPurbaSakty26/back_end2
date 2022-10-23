const express = require('express');
const controllers = require('../app/controllers');

const swaggerUI = require('swagger-ui-express');
const swgDoc = require('../OBYKAO26_1-OpenAPIBCR-1-resolved.json');

const apiRouter = express.Router();

/**
 * TODO: Implement your own API
 *       implementations
 */
//
apiRouter.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swgDoc));

apiRouter.get('/api/v1/cars', controllers.api.v1.car.list);
apiRouter.post('/api/v1/cars', controllers.api.v1.auth.authorize, controllers.api.v1.auth.adminOrSuperAdmin, controllers.api.v1.car.create);
apiRouter.put('/api/v1/cars/:id', controllers.api.v1.auth.authorize, controllers.api.v1.auth.adminOrSuperAdmin, controllers.api.v1.car.update);
apiRouter.delete('/api/v1/cars/:id', controllers.api.v1.auth.authorize, controllers.api.v1.auth.adminOrSuperAdmin, controllers.api.v1.car.destroy);
apiRouter.get('/api/v1/cars/:id', controllers.api.v1.car.show);

// Add user
apiRouter.post('/api/v1/register', controllers.api.v1.auth.register);
apiRouter.post('/api/v1/admin-register', controllers.api.v1.auth.authorize, controllers.api.v1.auth.SuperAdmin, controllers.api.v1.auth.adminRegister);
apiRouter.post('/api/v1/login', controllers.api.v1.auth.login);
// user
apiRouter.get('/api/v1/users', controllers.api.v1.auth.authorize, controllers.api.v1.auth.adminOrSuperAdmin, controllers.api.v1.auth.getAll);
apiRouter.get('/api/v1/whoami', controllers.api.v1.auth.authorize, controllers.api.v1.auth.whoAmI);
apiRouter.put('/api/v1/users/:id', controllers.api.v1.auth.authorize, controllers.api.v1.auth.adminOrSuperAdmin, controllers.api.v1.auth.update);
apiRouter.get('/api/v1/users/:id', controllers.api.v1.auth.authorize, controllers.api.v1.auth.adminOrSuperAdmin, controllers.api.v1.auth.getDetail);
apiRouter.delete('/api/v1/users/:id', controllers.api.v1.auth.authorize, controllers.api.v1.auth.adminOrSuperAdmin, controllers.api.v1.auth.delete);
/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get('/api/v1/errors', () => {
  throw new Error('The Industrial Revolution and its consequences have been a disaster for the human race.');
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
