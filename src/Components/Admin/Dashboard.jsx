import React, {useEffect, useState} from 'react';
import Loading from '../Loading';

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    // const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setData({
            usersClients: 34,
            usersAdmins: 2,
            ordersOpened: 12,
            ordersClosed: 35,
            ordersCanceled: 8,
            products: 7,
        });
        // fetch('/api/')
        //     .then(res => res.json())
        //     .then(data => {
        //         setOrders(data);
        //         setLoading(false);
        //     })
        //     .catch(err => {
        //         setError(true);
        //         setLoading(false);
        //     });
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-6 col-md-4 col-xl-2 col-xxl-1"><div className="content"><p><span className="numberdata">{data.usersClients}</span>Clientes</p></div></div>
                <div className="col-12 col-sm-6 col-md-4 col-xl-2 col-xxl-1"><div className="content"><p><span className="numberdata">{data.usersAdmins}</span>Admins</p></div></div>
                <div className="col-12 col-sm-6 col-md-4 col-xl-2 col-xxl-1"><div className="content"><p><span className="numberdata">{data.products}</span>Produtos</p></div></div>
                <div className="col-12 col-sm-6 col-md-4 col-xl-2 col-xxl-1"><div className="content"><p><span className="numberdata">{data.ordersOpened}</span>Pedidos abertos</p></div></div>
                <div className="col-12 col-sm-6 col-md-4 col-xl-2 col-xxl-1"><div className="content"><p><span className="numberdata">{data.ordersClosed}</span>Pedidos finalizados</p></div></div>
                <div className="col-12 col-sm-6 col-md-4 col-xl-2 col-xxl-1"><div className="content"><p><span className="numberdata">{data.ordersCanceled}</span>Pedidos cancelados</p></div></div>
            </div>
        </div>
    );
}
export default Dashboard;