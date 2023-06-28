import { useEffect, useState } from 'react';
import {Form} from '../../components'
import { useNavigate } from 'react-router-dom';
import {signUp} from '../../apis';
import { inputValidationRegex } from '../../utils/validate';

function Signup() {
  const [value, setValue] = useState(['', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isDisabled = () => inputValidationRegex.email.test(value[0]) && inputValidationRegex.password.test(value[1]);
  const onEmailChange = (e) => setValue((cur) => [e.target.value, cur[1]]);
  const onPasswordChange = (e) => setValue((cur) => [cur[0], e.target.value]);
  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await signUp(value[0], value[1]);
    if (response.status === 201) {
      setErrorMessage('')
      navigate("/signin")
    }
    else {
      if (response.response) setErrorMessage(response.response.data.message)
      else console.error('Error signup:', response);
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
            <h1>회원가입</h1>
            <Form type={'signup'} value={value} onEmailChange={onEmailChange} onPasswordChange={onPasswordChange} onSubmit={onSubmit} isDisabled={isDisabled}/>
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

export { Signup };
