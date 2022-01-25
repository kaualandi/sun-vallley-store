import BotError from './Vectors/BotError.jsx';
import './Styles/EmptyCart.css';
function EmptyCart() {
    return (
        <div className="empty-cart row justify-content-center mb-4 align-items-center">
            <div className="empty-cart__content text-center col-12 col-sm-6">
                <h4>Carrinho vazio!</h4>
                <p>Adicione produtos ao seu carrinho para continuar comprando.</p>
                <a href="/products" className="button fancy-border-radius">Ver Produtos</a>
            </div>
            <div className="empty-cart__image col-12 col-sm-6">
                <BotError />
            </div>
        </div>
    );
}
export default EmptyCart;