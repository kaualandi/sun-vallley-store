import React, {useEffect, useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import Loading from '../Loading';

function Orders({setAllOrders, allOrders}) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const hoje = moment();
    function isWarranty(date) {
        console.log();
        let partesData = date.split("-");
        let day = partesData[2];
        let month = partesData[1] - 1;
        let year = partesData[0];
        let data = new Date(year, month, day);
        if(hoje.diff(data, 'days') <= 30) {
            return true;
        } else {
            return false;
        }
    }

    function actionOrder(order_id, action) {
        setLoading(true);
        axios.post('http://'+window.location.hostname+'/api/admin/alterOrder.php', {
            user_id: sessionStorage.getItem('user_id'),
            order_id: order_id,
            action: action
        })
        .then(function (response) {
            let result = response.data;
            if (result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                setSuccess(result.success);
                
                axios.post('http://'+window.location.hostname+'/api/getOrders.php', {
            user_id: sessionStorage.getItem('user_id')
        })
            .then(function (response) {
                let result = response.data;
                if (result.error) {
                    setError(result.error);
                    setLoading(false);
                } else {
                    const AllOrders = result.map(order => {
                        return {
                            id: order.order_id,
                            date: order.data.split('-').reverse().join('/'),
                            client_name: order.name,
                            client_email: order.email,
                            details: order.details,
                            total: parseFloat(order.total),
                            status: order.order_status,
                            pay_status: order[8],
                            preference_id: order.preference_id,
                            warranty: isWarranty(order.data),
                            };
                    });
                    if (filter === '') {
                        setOrders(AllOrders);
                    } else {
                        const filteredOrders = AllOrders.filter(status => status.status === filter);
                        setOrders(filteredOrders);
                    }
                    setLoading(false);
                }
            })
            .catch(function (error) {
                setError('Um erro aconteceu, mas só Deus sabe qual. Tente recarregar a página.');
                setLoading(false);
            });

                setLoading(false);
            }
        })
        .catch(function (error) {
            setError('Um erro aconteceu, mas só Deus sabe qual. Tente recarregar a página.');
            setLoading(false);
        });
    }

    useEffect(() => {
        setLoading(true);
        axios.post('http://'+window.location.hostname+'/api/getOrders.php', {
            user_id: sessionStorage.getItem('user_id')
        })
            .then(function (response) {
                let result = response.data;
                if (result.error) {
                    setError(result.error);
                    setLoading(false);
                } else {
                    const AllOrders = result.map(order => {
                        return {
                            id: order.order_id,
                            date: order.data.split('-').reverse().join('/'),
                            client_name: order.name,
                            client_email: order.email,
                            details: order.details,
                            total: parseFloat(order.total),
                            status: order.order_status,
                            pay_status: order[8],
                            preference_id: order.preference_id,
                            warranty: isWarranty(order.data),
                            };
                    });
                    if (filter === '') {
                        setOrders(AllOrders);
                    } else {
                        const filteredOrders = AllOrders.filter(status => status.status === filter);
                        setOrders(filteredOrders);
                    }
                    setLoading(false);
                }
            })
            .catch(function (error) {
                setError('Um erro aconteceu, mas só Deus sabe qual. Tente recarregar a página.');
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    function closeButton(state) {
        if ('error') setError(null);
        if ('success') setSuccess(null);
    }
    
    if (loading) return <Loading />;

    if (orders.length === 0) {
        return (
            <div className="orders-content">
                <div className="orders-filter">
                    <h3>Filtros</h3>
                    <button onClick={() => setFilter('')} className='btn'>Todos</button>
                    <button onClick={() => setFilter('aberto')} className={filter === "aberto" ? 'focus btn' : 'btn'}>Aberto</button>
                    <button onClick={() => setFilter('fechado')} className={filter === "fechado" ? 'focus btn' : 'btn'}>Fechado</button>
                    <button onClick={() => setFilter('cancelado')} className={filter === "cancelado" ? 'focus btn' : 'btn'}>Cancelado</button>
                </div>
            <div style={{overflow: 'hidden'}} className="table-container">
    
            <table className="table">
                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Data</th>
                        <th>Nome do cliente</th>
                        <th>Email do cliente</th>
                        <th>Detalhes</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Garantia</th>
                    </tr>
                </thead>
            </table>
            <div className="end text-center"><h4>Nenhum pedido <span role='img' aria-label='rosto perseverante'>😣</span></h4></div>
            </div>
            </div>
        );
    }

    return (
        <div className="orders-content">
            {error && <div className="alert alert-danger" role="alert">{error} <button onClick={() => closeButton('error')} className="button-close-alert no-style"><i className="fa-solid fa-xmark"></i></button></div>}
            {success && <div className="alert alert-success" role="alert">{success} <button onClick={() => closeButton('success')} className="button-close-alert no-style"><i className="fa-solid fa-xmark"></i></button></div>}
            <div className="orders-filter">
                <h3>Filtros</h3>
                <button onClick={() => setFilter('')} className='btn'>Todos</button>
                <button onClick={() => setFilter('aberto')} className={filter === "aberto" ? 'focus btn' : 'btn'}>Aberto</button>
                <button onClick={() => setFilter('fechado')} className={filter === "fechado" ? 'focus btn' : 'btn'}>Fechado</button>
                <button onClick={() => setFilter('cancelado')} className={filter === "cancelado" ? 'focus btn' : 'btn'}>Cancelado</button>
            </div>
        <div className="table-container">

        <table className="table">
            <thead>
                <tr>
                    <th>Pedido</th>
                    <th>Data</th>
                    <th>Nome do cliente</th>
                    <th>Email do cliente</th>
                    <th>Detalhes</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Garantia</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.client_name}</td>
                        <td>{order.client_email}</td>
                        <td>{order.details}</td>
                        <td>{order.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                        <td>{order.status}</td>
                        <td>{order.warranty ? 'Sim' : 'Não'}</td>
                        <td className='actions'>
                            {order.status === 'aberto' ? (
                                <>
                                    <button onClick={() => actionOrder(order.id, 'cancelado')} className='button-table close'><i className="fa-solid fa-xmark"></i></button> <button onClick={() => actionOrder(order.id, 'fechado')} className="button-table check"><i className="fa-solid fa-check"></i></button>
                                </>
                            ) : ''}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
    );
}
export default Orders;