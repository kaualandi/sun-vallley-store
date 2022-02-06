import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Loading from './Loading';
import EmptyOrders from './EmptyOrders';
import axios from 'axios';
import { useMercadopago } from 'react-sdk-mercadopago';
import './Styles/MyOrders.css';

function MyOrders() {
    const mercadopago = useMercadopago.v2('TEST-fea39f3b-8896-465f-a765-6f39dbba2ab4', {
        locale: 'pt-BR'
    });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
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

    useEffect(() => {
        setLoading(true);

        axios.post('https://'+window.location.hostname+'/api/get-myorders.php', {
            "user_id": sessionStorage.getItem('user_id')
            })
            .then(function (response) {
                let result = response.data;
                if(result.error) {
                    setError(result.error);
                    setLoading(false);
                } else {
                    const orders = result.map(order => {
                        return {
                            id: order.order_id,
                            date: order.data.split('-').reverse().join('/'),
                            details: order.details,
                            total: parseFloat(order.total),
                            status: order.status,
                            pay_status: order[8],
                            preference_id: order.preference_id,
                            warranty: isWarranty(order.data),
                        }
                    });
                    setLoading(false);
                    setOrders(orders);
                }
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (<Loading/>);
    }
    if (error) {
        return <EmptyOrders/>;
    }

    function payNow(id) {
        const checkout = mercadopago.checkout({
            preference: {
                id: id
            }
        });
        checkout.open();
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
                        <th>Garantia?</th>
                        <th>Pago?</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.details}</td>
                            <td>{order.status}</td>
                            <td>{order.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                            <td>{order.warranty ? "Sim" : "Não"}</td>
                            <td>{order.pay_status === "approved" ? "Sim" : "Não"}</td>
                            <td>
                                {order.pay_status !== "approved" ? (
                                    <button className='button-table check' onClick={() => payNow(order.preference_id)}><i className="fa-solid fa-dollar-sign"></i></button>
                                ) : ''}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default MyOrders;