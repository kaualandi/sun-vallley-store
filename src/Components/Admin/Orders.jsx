import {useEffect, useState} from 'react';
import moment from 'moment';
import Loading from '../Loading';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('');
    // const [error, setError] = useState(null);
    const hoje = moment();
    function isWarranty(date) {
        console.log();
        let partesData = date.split("/");
        let day = partesData[0];
        let month = partesData[1] - 1;
        let year = partesData[2];
        let data = new Date(year, month, day);
        if(hoje.diff(data, 'days') <= 30) {
            return true;
        } else {
            return false;
        }
    }

    function actionOrder(id, action) {
        console.log('actionOrder:', id, action);
    }

    useEffect(() => {
        setLoading(true);
        const allOrders = [
            {
                id: 0,
                date: '01/01/2021',
                client: 'João da Silva',
                emailClient: 'demo@host.com',
                details: 'Spotify, Minecraft, LOL',
                total: 'R$ 100,00',
                status: 'fechado',
                warranty: isWarranty('01/01/2021') ? 'Sim' : 'Não'
            },
            {
                id: 1,
                date: '01/01/2022',
                client: 'João da Silva',
                emailClient: 'demo@host.com',
                details: 'Spotify, Minecraft, LOL',
                total: 'R$ 100,00',
                status: 'fechado',
                warranty: isWarranty('01/01/2022') ? 'Sim' : 'Não'
            },
        ];
        if (filter === '') {
            setOrders(allOrders);
        } else {
            const filteredOrders = allOrders.filter(status => status.status === filter);
            setOrders(filteredOrders);
        }
        // fetch(`/api/orders?filter=${filter}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setOrders(data);
        //         setLoading(false);
        //     })
        //     .catch(err => {
        //         // setError(err);
        //         setLoading(false);
        //     });
        
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);
    
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
            <div className="end text-center"><h4>Nenhum pedido 😣</h4></div>
            </div>
            </div>
        );
    }

    return (
        <div className="orders-content">
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
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.client}</td>
                        <td>{order.emailClient}</td>
                        <td>{order.details}</td>
                        <td>{order.total}</td>
                        <td>{order.status}</td>
                        <td>{order.warranty}</td>
                        <td className='actions'><button onClick={() => actionOrder(order.id, 'close')} className='button-table close'><i className="fa-solid fa-xmark"></i></button> <button onClick={() => actionOrder(order.id, 'check')} className="button-table check"><i className="fa-solid fa-check"></i></button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
    );
}
export default Orders;