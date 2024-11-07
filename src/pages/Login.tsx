import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [loginValue, setLoginValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const checkLogin = () => {
        loginValue === 'admin' && passwordValue === 'admin'
            ? navigate('/list')
            : setError(true);
    };

    return (
        <>
            <RouterLink to='/'>back</RouterLink>
            <div className='loginDiv'>
                {error && <p>Invalid input data</p>}
                <input
                    type='text'
                    placeholder='login'
                    value={loginValue}
                    onChange={(e) => setLoginValue(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='password'
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                />
                <button onClick={() => checkLogin()}>submit</button>
            </div>
        </>
    );
};

export default Login;
