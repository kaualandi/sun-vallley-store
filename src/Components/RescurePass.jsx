import AOS from 'aos';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import axios from 'axios';
import Loading from './Loading';

import './Styles/RescurePass.css';

function RescurePass() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [rescurePassInfors, setRescurePassInfors] = useState({
        email: '',
        phone: '',
        password: ''
    });
    useEffect(() => {
        AOS.init({
            delay: 300,
        });
    }, []);
    function handleInputChange(e) {
        setRescurePassInfors({
            ...rescurePassInfors,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError(false);
        setLoading(true);
        axios.post('http://'+window.location.hostname+'/api/rescure-pass.php', rescurePassInfors)
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
        <div className="rescurepass-container">
            <div data-aos="zoom-in" className="rescurepass glass-efect">
                <div className="rescurepass-header">
                    <h2>Recupere sua senha</h2>
                </div>
                <div className="rescurepass-content">
                    {error ? (<p className="alert alert-danger" role="alert">{error}</p>) : null}
                    {loading ? (<Loading />) : (
                        <form onSubmit={handleSubmit}>
                            <label>Confirme seu e-mail:
                                <input onChange={handleInputChange} value={rescurePassInfors.email} name='email' required type="email" placeholder='Confirme seu e-mail.'/>
                            </label>
                            <label>Confirme seu celular:
                                <InputMask onChange={handleInputChange} value={rescurePassInfors.phone} name='phone' required type="tel" mask="+55 (99) 99999-9999" placeholder='Confirme seu celular.' maskChar='_'/>
                            </label>
                            <label>Nova senha:
                                <input onChange={handleInputChange} value={rescurePassInfors.password} name='password' required type="password" placeholder='Digite uma nova senha.'/>
                            </label>
                            <button className='btn' type="submit">Recuperar</button>
                        </form>
                    )}
                </div>
                <div className="rescurepass-footer">
                    <a href="/cadastrar">Cadastre-se</a> | <a href="/entrar">Entrar</a>
                </div>
            </div>
        </div>
    );
}
export default RescurePass;