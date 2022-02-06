import React, {useState, useEffect} from 'react';
import Loading from './Loading';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Styles/CartItem.css';

function CartItem({ cartItem }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const itemToRemove = {user_id: sessionStorage.getItem('user_id'), cart_id: cartItem.cart_id.toString()};
    let location = useLocation();

    useEffect(() => {
        setLoading(false);
    }, []);

    function removeToCart() {
        setError(false);
        setLoading(true);
        axios.post('http://'+window.location.hostname+'/api/removeToCart.php', itemToRemove)
        .then(function (response) {
            let result = response.data;
            if (result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                setLoading(false);
            }
            window.location.reload();
        })
        .catch(function (error) {
            setError('Um erro aconteceu, mas só Deus sabe qual!');
            setLoading(false);
        });
    }
    function changeQtdValue(state) {
        setError(false);
        setLoading(true);
        axios.post('http://'+window.location.hostname+'/api/alterCartItem.php', {user_id: sessionStorage.getItem('user_id'), cart_id: cartItem.cart_id.toString(), state: state})
        .then(function (response) {
            let result = response.data;
            if (result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                setLoading(false);
                window.location.reload();
            }
        })
        .catch(function (error) {
            setError('Um erro aconteceu, mas só Deus sabe qual!');
            setLoading(false);
        });
    }

    if (loading) return <Loading />;
    return (
        <div className="cartItem col-12 col-lg-6">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="cartItem-container glass-efect">
                <div className="cartItem-details">
                    <div className="cartItem-image">
                        <img src={cartItem.image} alt="cartItem" />
                    </div>
                    <div className="cartItem-info">
                        <p>{cartItem.name}</p>
                        <p className="cartItem-info__price">
                            <strong>{parseFloat(cartItem.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</strong>
                        </p>
                    </div>
                </div>
                <div className="cartItem-drop">
                    {location.pathname === '/carrinho' ? (
                        <>
                            <div className="select-quatity">
                                <button onClick={() => changeQtdValue('-')} className='btn reduce'>
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                <input readOnly type="number" min="1" value={cartItem.qtd} max="99"/>
                                <button onClick={() => changeQtdValue('+')} className='btn increase'>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <button className="btn" onClick={removeToCart}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </>
                    ) : (
                        <>
                            X {cartItem.qtd}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
export default CartItem;