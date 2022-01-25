import AOS from 'aos';
import { useEffect } from 'react';
import './Styles/Product.css';

function Product({ product }) {
    function addToCart(id) {
        console.log(`Adding ${product.name} to cart`);
    }
    useEffect(() => {
        AOS.init({
            delay: 300,
        });
    }, []);

    return (
        <div data-aos="zoom-in" className="product col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="product-container glass-efect">
                <div className="product-image">
                    <img src={product.image} alt="product" />
                </div>
                <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <p className="product-info__price">
                        <strong>{product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</strong>
                    </p>
                </div>
                <div className="product-buy">
                    <button className="btn" onClick={() => addToCart(product)}>
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product;