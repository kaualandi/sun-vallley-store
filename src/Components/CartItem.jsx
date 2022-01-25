import { useEffect } from 'react';
import AOS from 'aos';
import './Styles/CartItem.css';

function CartItem({ cartItem }) {
    function removeToCart(cartItem) {
        console.log(`Removendo ${cartItem.name} do carrinho`);
    }
    useEffect(() => {
        AOS.init({
            delay: 300,
        });
    }, []);

    return (
        <div data-aos="zoom-in" className="cartItem col-12 col-lg-6">
            <div className="cartItem-container glass-efect">
                <div className="cartItem-details">
                    <div className="cartItem-image">
                        <img src={cartItem.image} alt="cartItem" />
                    </div>
                    <div className="cartItem-info">
                        <p>{cartItem.name}</p>
                        <p className="cartItem-info__price">
                            <strong>{cartItem.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</strong>
                        </p>
                    </div>
                </div>
                <div className="cartItem-drop">
                    <button className="btn" onClick={() => removeToCart(cartItem)}>
                    <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default CartItem;