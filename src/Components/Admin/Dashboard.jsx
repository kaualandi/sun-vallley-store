import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Loading from '../Loading';

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        
        axios.post('http://'+window.location.hostname+'/api/admin/dashboard.php', {
            user_id: sessionStorage.getItem('user_id')})
        .then(function (response) {
            let result = response.data;
            if (result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                setData(result);
                setLoading(false);
            }
        })
        .catch(function (error) {
            setError('Um erro aconteceu, mas só Deus sabe qual. Tente recarregar a página.');
            setLoading(false);
        })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="container">
            {error && <div className='alert-danger alert' role='alert'>{error}</div>}
            <div className="row">
                <div className="col-12 col-sm-6 col-md-4 col-xl-2 col-xxl-1"><div className="content"><p><span className="numberdata">{data.total_clients}</span>Clientes</p></div></div>
                <div className="col-12 col-sm-6 col-md-4 col-xl-2 col-xxl-1"><div className="content"><p><span className="numberdata">{data.total_admins}</span>Admins</p></div></div>
                <div className="col-12 col-sm-6 col-md-4 col-xl-2 col-xxl-1"><div className="content"><p><span className="numberdata">{data.total_products}</span>Produtos</p></div></div>
                <div className="col-12 col-sm-6 col-md-4 col-xl-2 col-xxl-1"><div className="content"><p><span className="numberdata">{data.total_orders_open}</span>Pedidos abertos</p></div></div>
                <div className="col-12 col-sm-6 col-md-4 col-xl-2 col-xxl-1"><div className="content"><p><span className="numberdata">{data.total_orders_closed}</span>Pedidos finalizados</p></div></div>
                <div className="col-12 col-sm-6 col-md-4 col-xl-2 col-xxl-1"><div className="content"><p><span className="numberdata">{data.total_orders_canceled}</span>Pedidos cancelados</p></div></div>
            </div>
        </div>
    );
}
export default Dashboard;