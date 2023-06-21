import { useEffect, useState } from 'react';
import {Form} from '../../components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [value, setValue] = useState(['', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const emailRegex = /@/;
  const passwordRegex = /^.{8,}$/;
  const navigate = useNavigate();

  const isDisabled = () => emailRegex.test(value[0]) && passwordRegex.test(value[1]);
  const onEmailChange = (e) => setValue((cur) => [e.target.value, cur[1]]);
  const onPasswordChange = (e) => setValue((cur) => [cur[0], e.target.value]);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://www.pre-onboarding-selection-task.shop/auth/signin', {
        email: value[0],
        password: value[1],
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setErrorMessage('')
        localStorage.setItem("access_token", response.data.access_token);
        navigate("/todo")
      }
    }
    catch(error) {
      if (error.response) setErrorMessage(error.response.data.message)
      else console.log(error)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('access_token')) navigate("/todo")
    else setLoading(false);
  }, [])

  return (
    <>
      {
        loading 
          ? <div>로딩중</div> 
          : <>
            <h1>로그인</h1>
            <Form type={'signin'} value={value} onEmailChange={onEmailChange} onPasswordChange={onPasswordChange} onSubmit={onSubmit} isDisabled={isDisabled}/>
            {
              errorMessage === '' 
                ? null
                : <p>{errorMessage}</p>
            }
          </>
      }

    </>
  );
}

export { Signin };