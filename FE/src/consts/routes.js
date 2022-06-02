export const Routes = {
  Login: '/login',
  Logout: '/logout',
  Register: '/register/welcome',
  Success: '/register/success',
  Onboarding: '/register/onboarding/[id]',
  GoogleLogin: '/login/google',
  GoogleRedirect: '/google/redirect',
  Step1: '/register/onboarding/1/',
  Step2: '/register/onboarding/2/',
  Step3: '/register/onboarding/3/',
  Step4: '/register/onboarding/4/',
  Step5: '/register/onboarding/5/',
  Step6: '/register/onboarding/6/',
  Step7: '/register/onboarding/7/',
  Step8: '/register/onboarding/8/',
  ResetPassword: '/reset-password',
  ResetPasswordForm: '/reset-password-form',
  ResetPasswordSent: '/reset-password-sent',
};

export const GuestRoutes = [
  Routes.Login,
  Routes.Register,
  Routes.Step1,
  Routes.Step2,
  Routes.Step3,
  Routes.Step4,
  Routes.Step5,
  Routes.Step6,
  Routes.Step7,
  Routes.GoogleLogin,
  Routes.GoogleRedirect,
  Routes.ResetPassword,
  Routes.ResetPasswordForm,
  Routes.ResetPasswordSent,
];