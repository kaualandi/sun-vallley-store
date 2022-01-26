import {useState, useEffect} from 'react';
import Product from './Product';
import Loading from './Loading';
import './Styles/ProductsList.css';

function ProductsList({filter}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        const allProducts = [
            {
                id: 0,
                name: 'Minecraft Semi Acesso',
                description: 'Minecraft Semi Acesso: Não pode mudar e-mail.',
                category: 'game',
                price: 8.50,
                image: 'https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg'
            },
            {
                id: 1,
                name: 'Minecraft Alt',
                description: 'Minecraft Alternativa: Não pode mudar nada, apenas jogar.',
                price: 5.50,
                category: 'game',
                image: 'https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg'
            },
            {
                id: 2,
                name: 'Spotify Premium',
                description: 'Spotify Premium Family: Pode mudar quaisquer coisas.',
                price: 7.50,
                category: 'streaming',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/2048px-Spotify_App_Logo.svg.png'
            },
            {
                id: 3,
                name: 'NordVPN',
                description: 'NordVPN: Pode mudar quaisquer coisas.',
                price: 8.50,
                category: 'vpn',
                image: 'https://privacyonline.com.br/wp-content/uploads/2017/01/nordvpn-logo-1-1024x1024.jpg'
            },
            {
                id: 4,
                name: 'Discord Nitro',
                description: 'Discord Nitro 3 meses: Apenas para novos usuários.',
                price: 7.50,
                category: 'premium',
                image: 'https://production-gameflipusercontent.fingershock.com/us-east-1:d158cb15-61c1-4eb1-92bb-41c2c15265ea/bde6e85e-c9ca-4c4b-9ef4-28d6ba9b57c6/bc3c672a-8000-4b56-912a-c56876a02e5c/640x640.jpg'
            },
        ]

        if (filter === '') {
            setProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(product => product.category === filter);
            setProducts(filteredProducts);
        }
        setTimeout(() => {
            setLoading(false);
        }, 800);
        // fetch(`/api/products?${filter}`)
        // .then(res => res.json())
        // .then(res => {
        //     setProducts(res);
        //     setLoading(false);
        // })
        // .catch(err => {
        //     setError(err);
        //     setLoading(false);
        // });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);
    
    if (loading) {
        return <Loading />;
    }
    
    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }
    
    return (
        <div className="products-list row">
        {products.map(product => (
            <Product key={product.id} product={product}/>
            ))}
            <div className="end text-center"><h4>Fim 😣</h4></div>
        </div>
    );
}
export default ProductsList;