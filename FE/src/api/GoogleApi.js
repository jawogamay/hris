import API from './BaseApi.js';
import Cookies from 'js-cookie';

export const login = ({ email, googleId }) => {
  const payload = { email, googleId };
  return API.post('oauth/google/login', payload);
};

export const register = ({ email, googleId }) => {
  let onBoardingData = JSON.parse(Cookies.get('onboarding'));
  const payload = { email, googleId, onBoardingData };
  return API.post('oauth/google/register', payload);
};
