import axios from 'axios';

export const getUser = (email) => {
  const config = {
    method: 'GET',
    url: '/api/user/login',
    params: { email },
  };
  return axios(config);
};

export const createUser = (firstName, lastName, password, email) => {
  const createUserConfig = {
    method: 'POST',
    url: '/api/user/signUp',
    data: {
      first_name: firstName, last_name: lastName, password, email,
    },
  };
  // console.log(firstName, lastName, password, email);
  return axios(createUserConfig);
};
