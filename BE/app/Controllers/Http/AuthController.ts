import User from 'App/Models/User';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { string } from '@ioc:Adonis/Core/Helpers';
import Mail from '@ioc:Adonis/Addons/Mail';

export default class AuthController {
  public async register({ request, response }) {
    const validations = schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.minLength(10)]),
    });

    const data = await request.validate({ schema: validations });
    const user = await User.create(data);

    return response.created(user);
  }

  public async googleRegister({ request, response, auth }) {
    const validations = schema.create({
      email: schema.string({}, [rules.email()]),
      googleId: schema.string({}, [rules.minLength(10)]),
    });

    const data = await request.validate({ schema: validations });
    const user = await User.firstOrCreate(data);

    const generatedToken = await auth.use('api').generate(user, {
      expiresIn: '7days',
    });

    return response.created(generatedToken);
  }

  public async authLogin({ request, response, auth }) {
    const user = await User.findByOrFail('googleId', request.input('googleId'));
    const token = await auth.use('api').login(user, { expiresIn: '7days' });
    return response.send({ token });
  }

  public async login({ request, response, auth }) {
    const email = request.input('email');
    const password = request.input('password');

    try {
      const token = await auth.use('api').attempt(email, password, { expiresIn: '7days' });
      return token;
    } catch {
      return response.badRequest('Invalid credentials');
    }
  }

  public async checkLogin({ response, auth }) {
    await auth.use('api').check();
    return response.send({ isloggedIn: auth.use('api').isLoggedIn });
  }

  public async logout({ auth, response }) {
    await auth.logout();
    return response.status(200);
  }

  public async resetPassword({ request, response }) {
    const email = request.input('email');

    let user = await User.findBy('email', email);

    if (!user) {
      return response.badRequest({ error: 'User not found' });
    }

    const token = string.generateRandom(32);
    user.resetToken = token;

    // let url = Route.makeSignedUrl('resetPassword', { email: email }, {expiresIn: '10m'});

    try {
      await Mail.use('mailgun').send((message) => {
        message
          .to(email)
          .from('test@example.com')
          .subject('Password Reset')
          .htmlView('emails/reset-password', {
            url: `${process.env.FE_URL}/reset-password-form`,
          });
      });
    } catch (e) {
      return e;
    }

    return response.status(200);
  }
}
