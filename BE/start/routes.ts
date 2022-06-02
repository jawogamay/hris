/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => {
  return { hello: 'world' };
});

Route.group(() => {
  Route.post('/onboarding', 'UserDetailsController.store');
  Route.post('/username', 'UserDetailsController.addUserName');
  Route.post('/register', 'AuthController.register');
  Route.post('/login', 'AuthController.login');
  Route.post('/reset-password', 'AuthController.resetPassword');
  Route.get('/reset-password', 'AuthController.resetPasswordForm').as('resetPassword');

  Route.post('/oauth/login', 'AuthController.authLogin');
  Route.post('/oauth/register', 'AuthController.googleRegister');
}).prefix('api');

Route.group(() => {
  Route.get('/check-login', 'AuthController.checkLogin');
  Route.post('/logout', 'AuthController.logout');
})
  .prefix('api')
  .middleware('auth');
