import {useState, useEffect} from 'react';
import moment from 'moment'
import Loading from './Loading';
import './Styles/MyOrders.css';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);
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

    useEffect(() => {
        setLoading(true);
        setOrders([
            {
                id: 1,
                date: '24/12/2021',
                status: 'Pendente',
                details: 'Spotify, Minecraft, LOL',
                total: 'R$ 100,00',
                warranty: isWarranty('24/12/2021') ? 'Sim' : 'Não'
            },
            {
                id: 2,
                date: '1/1/2022',
                status: 'Finalizado',
                details: 'Spotify, Minecraft, LOL',
                total: 'R$ 100,00',
                warranty: isWarranty('1/1/2022') ? 'Sim' : 'Não'
            },
            {
                id: 3,
                date: '25/12/2021',
                status: 'Cancelado',
                details: 'Spotify, Minecraft, LOL',
                total: 'R$ 100,00',
                warranty: isWarranty('25/12/2021') ? 'Sim' : 'Não'
            },
        ]);

        // fetch('/api/orders')
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

    if (loading) {
        return (<Loading/>);
    }
    return (
        <div className="my-orders">
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Data</th>
                        <th>Detalhes</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Garantia</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.details}</td>
                            <td>{order.status}</td>
                            <td>{order.total}</td>
                            <td>{order.warranty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default MyOrders;