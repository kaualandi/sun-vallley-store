import React, {useState, useEffect} from 'react';
import Loading from './Loading';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import './Styles/CartList.css';
import axios from 'axios';

function CartList({setTotalValue}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cartItens, setCartItens] = useState([]);

    function calcTotalValue(data) {
        let totalValue = 0;
        data.forEach(item => {
            totalValue += (item.price * item.qtd);
        });
        return totalValue;
    }

    useEffect(() => {
        setLoading(true);
        axios.post('https://'+window.location.hostname+'/api/mycart.php',
        {user_id: sessionStorage.getItem('user_id')})
        .then(function (response) {
            if (response.data.error) {
                setError(response.data.error);
                setLoading(false);
            } else {
                setCartItens(response.data);
                setLoading(false);
                setTotalValue(calcTotalValue(response.data));
            }
        })
        .catch(function (error) {
            setError('Um erro aconteceu, mas só Deus sabe qual!');
            setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (loading) {
        return <Loading />;
    }
    if (error === 'Não há produtos no carrinho!' || cartItens.length === 0) {
        return <EmptyCart/>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className="cart-list row">
            {error && <div>{error}</div>}
        {cartItens.map(cartItem => (
            <CartItem key={cartItem.cart_id} cartItem={cartItem} />
        ))}
        </div>
    );
}
export default CartList;