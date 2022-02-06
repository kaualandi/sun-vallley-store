import React, {useState, useEffect} from 'react';
import Product from './Product';
import Loading from './Loading';
import './Styles/ProductsList.css';
import axios from 'axios';

function ProductsList({filter}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        axios.post('https://'+window.location.hostname+'/api/products.php')
            .then(function (response) {
                if (filter === '') {
                    setProducts(response.data);
                    setLoading(false);
                } else {
                    const filteredProducts = response.data.filter(product => product.category === filter);
                    setProducts(filteredProducts);
                    setLoading(false);
                }
                if (response.data.error) {
                    setError(response.data.error);
                    setLoading(false);
                }
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);
    
    if (loading) {
        return <Loading />;
    }
    
    if (error) {
        return <div><p className="alert alert-danger" role="alert">{error}</p></div>;
    }
    return (
        <div className="products-list row">
        {products.map(product => (
            <Product key={product.product_id} product={product}/>
            ))}
            <div className="end text-center"><h4>Fim <span role='img' aria-label='rosto perseverante'>😣</span></h4></div>
        </div>
    );
}
export default ProductsList;