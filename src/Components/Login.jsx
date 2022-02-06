import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import Loading from './Loading';

import './Styles/Login.css';

function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [loginInfors, setLoginInfors] = useState({
        email: '',
        password: ''
    });
    if (sessionStorage.getItem('user_id')) {
        window.location.href = '/'
    }
    useEffect(() => {
        AOS.init({
            delay: 300,
        });
    }, []);

    function handleInputChange(e) {
        setLoginInfors({
            ...loginInfors,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError(false);
        setLoading(true);
        axios.post('https://'+window.location.hostname+'/api/login.php', loginInfors)
                .then(function (response) {
                    let result = response.data;
                    if(result.success) {
                        sessionStorage.setItem('user_id', result.user_id);
                        let userFirstName = result.user_name.split(' ')[0] || result.user_name;
                        sessionStorage.setItem('firtName', userFirstName);
                        sessionStorage.setItem('function',parseInt(result.user_function));
                        window.location.href = '/';
                    } else if (result.error) {
                        setError(result.error);
                        setLoading(false);
                    }
                  })
                  .catch(function (error) {
                      console.log(error.toString());
                    setError('Um erro aconteceu, mas só Deus sabe qual',error);
                    setLoading(false);
                  });
    }

    return (
        <div className="login-container">
            <div data-aos="zoom-in" className="login glass-efect">
                <div className="login-header">
                    <h2>Entre em sua conta</h2>
                </div>
                <div className="login-content">
                    {error ? (<p className="alert alert-danger" role="alert">{error}</p>) : null}
                    {loading ? (<Loading />) : (
                        <form onSubmit={handleSubmit}>
                            <label>E-mail:
                                <input onChange={handleInputChange} value={loginInfors.email} name='email' required type="email" placeholder='Digite seu e-mail.'/>
                            </label>
                            <label>Senha:
                                <input onChange={handleInputChange} value={loginInfors.password} name='password' required type="password" placeholder='Digite sua senha.'/>
                            </label>
                            <button className='btn' type="submit">Entrar</button>
                        </form>
                    )}
                </div>
                <div className="login-footer">
                    <a href="/cadastrar">Cadastre-se</a> | <a href="/recuperar-senha">Esqueci a senha</a>
                </div>
            </div>
        </div>
    );
}
export default Login;