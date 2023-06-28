import axios from 'axios';

const signIn = async (email, password) => {
  try {
    const response = await axios.post('https://www.pre-onboarding-selection-task.shop/auth/signin', {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response
  }
  catch(error) {
    return error;
  }
};

const signUp = async (email, password) => {
  try {
    const response = await axios.post('https://www.pre-onboarding-selection-task.shop/auth/signup', {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response
  }
  catch(error) {
    return error;
  }
};

export {signIn, signUp}