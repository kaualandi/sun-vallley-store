import axios from 'axios';
import React, {useState, useEffect} from 'react';
import InputMask from 'react-input-mask';
import Loading from './Loading';
import './Styles/MyData.css';

function MyData() {
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!sessionStorage.getItem('user_id')) {
        window.location.href = '/entrar';
    }

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(false);
        axios.post('http://' + window.location.hostname + '/api/alter-mydata.php', {
            user_id: sessionStorage.getItem('user_id'),
            name: data.name,
            email: data.email,
            phone: data.phone,
            confirmpass: data.pass
        })
            .then(function (response) {
                if (response.data.error) {
                    setError(response.data.error);
                    setLoading(false);
                } else {
                    setSuccess('Dados alterados com sucesso!');
                    setError(false);
                    setLoading(false);
                }
            }
        );
    }

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios.post('http://'+window.location.hostname+'/api/get-mydata.php', {
            "user_id": sessionStorage.getItem('user_id')
            })
            .then(function (response) {
                let result = response.data[0];
                if(result.error) {
                    setError(result.error);
                    setLoading(false);
                } else {
                    setData({
                        name: result.name,
                        email: result.email,
                        phone: result.phone,
                        function: result.function,
                        pass: "",
                    });
                    setLoading(false);
                }
            });
    }, []);
    if (loading) {
        return (<Loading/>);
    }
    return (
        <div className="my-data">
            <div className='ballon text-center'>
                <div>{data.function === "1" ? 'Administrador' : 'Cliente'}</div>
            </div>
            {error && <div className="alert alert-danger" role="alert">{error} <button onClick={() => setError(false)} className="button-close-alert no-style"><i className="fa-solid fa-xmark"></i></button></div>}
            {success && <div className="alert alert-success" role="alert">{success} <button onClick={() => setError(false)} className="button-close-alert no-style"><i className="fa-solid fa-xmark"></i></button></div>}

            <div className="my-data-content">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className='col-12 col-md-6'>
                            <label>Nome:
                                <input autoComplete="off" required onChange={handleChange} name='name' value={data.name} type="text" placeholder='Digite seu nome.'/>
                            </label>
                        </div>
                        <div className='col-12 col-md-6'>
                            <label>E-mail:
                                <input autoComplete="off" required onChange={handleChange} name='email' value={data.email} type="email" placeholder='Digite seu e-mail.'/>
                            </label>
                        </div>
                        <div className='col-12 col-md-6'>
                            <label>Celular:
                                <InputMask autoComplete="off" required onChange={handleChange} name='phone' value={data.phone} type="tel" mask="+55 (99) 99999-9999" placeholder='Digite seu celular.' maskChar='_'/>
                            </label>
                        </div>
                        <div className='col-12 col-md-6'>
                            <label>Confirme sua senha:
                                <input autoComplete="off" value={data.pass} required onChange={handleChange} name='pass' type="password" placeholder='Digite sua senha.'/>
                            </label>
                        </div>
                    </div>
                    <button className='btn' type="submit" >Alterar</button>
                </form>
            </div>
        </div>
    );
}
export default MyData;