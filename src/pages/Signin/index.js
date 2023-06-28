import { useEffect, useState } from 'react';
import {Form} from '../../components'
import { useNavigate } from 'react-router-dom';
import {signIn} from '../../apis';
import { inputValidationRegex } from '../../utils/validate';

function Signin() {
  const [value, setValue] = useState(['', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isDisabled = () => inputValidationRegex.email.test(value[0]) && inputValidationRegex.password.test(value[1]);
  const onEmailChange = (e) => setValue((cur) => [e.target.value, cur[1]]);
  const onPasswordChange = (e) => setValue((cur) => [cur[0], e.target.value]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await signIn(value[0], value[1]);
    if (response.status === 200) {
      setErrorMessage('')
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/todo")
    }
    else {
      if (response.response) setErrorMessage(response.response.data.message)
      else console.error('Error signin:', response);
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