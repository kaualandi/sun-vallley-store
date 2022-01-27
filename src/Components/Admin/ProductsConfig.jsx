import React, {useState, useEffect} from 'react';
import Loading from '../Loading';
import EditingProduct from './EditingProduct';

function ProductsConfig() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [addingProduct, setAddingProduct] = useState({});
    // const [error, setError] = useState(false);

    function editProduct(id) {
        setEditing(id);
    }
    function dropProduct(id) {
        console.log(`Removendo produto ${id}`);
    }
    function handleAddProduct(e) {
        setAddingProduct({
            ...addingProduct,
            [e.target.name]: e.target.value
        });
    }
    function addProduct(e) {
        e.preventDefault();
        console.log(`Adicionando produto...`);
    }

    useEffect(() => {
        setLoading(true);
        setAddingProduct({
            name: '',
            price: '',
            description: '',
            image: '',
            category: '',
        });
        setProducts([
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
        ]);

        // fetch('/api/products')
        //     .then(res => res.json())
        //     .then(data => {
        //         setProducts(data);
        //         setLoading(false);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         setLoading(false);
        //     });

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return <Loading />;

    if (editing !== false) {
        return <EditingProduct setEditing={setEditing} editing={editing}/>;
    }
    return (
        <div className="productsadmin">
            <section id="addproduct">
                <h3>Adicionar Produto</h3>
                    <form onSubmit={e => addProduct(e)} className=''>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Nome:
                                <input onChange={handleAddProduct} value={addingProduct.name} type="text" name="name" placeholder='Nome do produto'/>
                            </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Preço:
                                <input onChange={handleAddProduct} value={addingProduct.price} type="text" name="price" placeholder='Use valores decimais. ex: 8.50' />
                            </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Categoria:
                                <select onChange={handleAddProduct} value={addingProduct.name} name="category">
                                    <option value="premium">Premium</option>
                                    <option value="game">Jogo</option>
                                    <option value="streaming">Streaming</option>
                                    <option value="vpn">VPN</option>
                                    <option value="adultos">Adultos</option>
                                </select>
                            </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Descrição:
                                <input onChange={handleAddProduct} value={addingProduct.description} name="description" placeholder='Digite o que pode ser alterado na conta'/>
                            </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Imagem:
                                <input onChange={handleAddProduct} value={addingProduct.image} type="url" name="image" placeholder='URL da imagem'/>
                            </label>
                            </div>
                        </div>
                        <button className='btn' type="submit">Adicionar</button>
                    </form>
            </section>
            <section id="manipulateproducts">
                <h3>Lista de produtos</h3>
                <div className="table-container">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Categoria</th>
                                <th>Descrição</th>
                                <th>Imagem</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                                    <td>{product.category}</td>
                                    <td>{product.description}</td>
                                    <td><img src={product.image} alt="imagem do produto" /></td>
                                    <td className='actions'><button onClick={() => editProduct(product)} className="button-table edit"><i className="fa-solid fa-pen"></i></button> <button onClick={() => dropProduct(product.id)} className="button-table delete"><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
export default ProductsConfig;