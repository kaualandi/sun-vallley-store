import AOS from 'aos';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import axios from 'axios';
import Loading from './Loading';
import './Styles/Register.css';

function Register() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [registerInfors, setRegisterInfors] = useState({
        name: '',
        phone: '',
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
        setRegisterInfors({
            ...registerInfors,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError(false);
        setLoading(true);
        axios.post('https://'+window.location.hostname+'/api/register.php', registerInfors)
                .then(function (response) {
                    let result = response.data;
                    if(result.success) {
                        window.location.href = '/entrar';
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
        <div className="register-container">
            <div data-aos="zoom-in" className="register glass-efect">
                <div className="register-header">
                    <h2>Crie uma conta</h2>
                </div>
                <div className="register-content">
                    {error ? (<p className="alert alert-danger" role="alert">{error}</p>) : null}
                    {loading ? (<Loading />) : (
                        <form onSubmit={handleSubmit}>
                            <label>Nome:
                                <input onChange={handleInputChange} value={registerInfors.name} name='name' required type="text" placeholder='Digite seu nome.'/>
                            </label>
                            <label>E-mail:
                                <input onChange={handleInputChange} value={registerInfors.email} name='email' required type="email" placeholder='Digite seu e-mail.'/>
                            </label>
                            <label>Celular:
                                <InputMask onChange={handleInputChange} value={registerInfors.phone} name='phone' required type="tel" mask="+55 (99) 99999-9999" placeholder='Digite seu celular.' maskChar='_'/>
                            </label>
                            <label>Senha:
                                <input onChange={handleInputChange} value={registerInfors.password} name='password' required type="password" placeholder='Digite sua senha.'/>
                            </label>
                            <button className='btn' type="submit">Cadastrar</button>
                        </form>
                    )}
                </div>
                <div className="register-footer">
                    <a href="/entrar">Entrar</a> | <a href="/ajuda">Ajuda</a>
                </div>
            </div>
        </div>
    );
}
export default Register;