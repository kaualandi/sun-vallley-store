import {useState} from 'react';
import HeaderContents from "./HeaderContents";
import ProductsList from "./ProductsList";
import './Styles/Products.css';

function Products() {
    const [filter, setFilter] = useState('');

    return (
        <div className="products">
            <HeaderContents title="Produtos"/>
            <div className="products-content container">
                <div className="products-content__filter">
                    <h3>Filtros</h3>
                    <button onClick={() => setFilter('')} className='btn'>Limpar</button>
                    <button onClick={() => setFilter('game')} className={filter === "game" ? 'focus btn' : 'btn'}>Game</button>
                    <button onClick={() => setFilter('streaming')} className={filter === "streaming" ? 'focus btn' : 'btn'}>Streaming</button>
                    <button onClick={() => setFilter('vpn')} className={filter === "vpn" ? 'focus btn' : 'btn'}>VPN</button>
                    <button onClick={() => setFilter('premium')} className={filter === "premium" ? 'focus btn' : 'btn'}>Premium</button>
                    <button onClick={() => setFilter('adultos')} className={filter === "adultos" ? 'focus btn' : 'btn'}>Adultos</button>
                </div>
                <div className="products-content_list">
                    <ProductsList filter={filter}/>
                </div>
            </div>
        </div>
    );
}
export default Products;