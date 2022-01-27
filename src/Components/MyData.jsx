import React, {useState, useEffect} from 'react';
import InputMask from 'react-input-mask';
import Loading from './Loading';
import './Styles/MyData.css';

function MyData() {
    const [data, setData] = useState({});
    // const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (data.pass === data.confirmPass) {
            alert('Dados alterados com sucesso!');
            setLoading(false);
        } else {
            alert('Senha incorreta, nada foi alterado!');
            setLoading(false);
        }
    //     fetch('/api/mydata', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //     .then(res => res.json())
    //     .then(res => {
    //         setLoading(false);
    //         if(res.error) {
    //             alert(res.error);
    //         } else {
    //             alert('Success');
    //         }
    //     })
    //     .catch(err => {
    //         setLoading(false);
    //         alert('Error');
    //     });
    }

    useEffect(() => {
        setLoading(true);
        // fetch("https://api.myjson.com/bins/1hjv7i")
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setFaq(data);
        //         setLoading(false);
        //     }).catch(err => {
        //         setError(err);
        //         setLoading(false);
        //     });
        setData({
            "id": 0,
            "name": "Kauã Landi",
            "email": "kaualandi@hotmail.com",
            "phone": "+55 (21) 99922-2644",
            "confirmPass": "123456",
            "pass": ""
        });
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    if (loading) {
        return (<Loading/>);
    }
    return (
        <div className="my-data">
            <div className="my-data-content">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className='col-12 col-md-6'>
                            <label>Nome:
                                <input required onChange={handleChange} name='name' value={data.name} type="text" placeholder='Digite seu nome.'/>
                            </label>
                        </div>
                        <div className='col-12 col-md-6'>
                            <label>E-mail:
                                <input required onChange={handleChange} name='email' value={data.email} type="email" placeholder='Digite seu e-mail.'/>
                            </label>
                        </div>
                        <div className='col-12 col-md-6'>
                            <label>Celular:
                                <InputMask required onChange={handleChange} name='phone' value={data.phone} type="tel" mask="+55 (99) 99999-9999" placeholder='Digite seu celular.' maskChar='_'/>
                            </label>
                        </div>
                        <div className='col-12 col-md-6'>
                            <label>Confirme sua senha:
                                <input value={data.pass} required onChange={handleChange} name='pass' type="password" placeholder='Digite sua senha.'/>
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