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
  const getUserConfig = {
    method: 'GET',
    url: '/api/user/login',
    params: { email },
  };
  const createUserConfig = {
    method: 'POST',
    url: '/api/user/signUp',
    data: {
      first_name: firstName, last_name: lastName, password, email,
    },
  };
  // console.log(firstName, lastName, password, email);
  return axios(getUserConfig)
    .then((res) => {
      if (res.data.length === 0) {
        return axios(createUserConfig);
      } else {
        alert('this email is used');
      }
    }).catch((error) => {
      console.log('unable to check if this user exist ', error);
    });
  // return axios(createUserConfig);
};

export const createThirdProviderUser = (firstName, lastName, email, photoUrl) => {
  const getUserConfig = {
    method: 'GET',
    url: '/api/user/login',
    params: { email },
  };
  const createUserConfig = {
    method: 'POST',
    url: '/api/user//signUp/thirdParty',
    data: {
      first_name: firstName, last_name: lastName, email, profile_pic_url: photoUrl,
    },
  };
  // console.log(firstName, lastName, password, email);
  return axios(getUserConfig)
    .then((res) => {
      if (res.data.length === 0) {
        return axios(createUserConfig);
      } else {
        alert('this email is used');
      }
    }).catch((error) => {
      console.log('unable to check if this user exist ', error);
    });
  // return axios(createUserConfig);
};
