import React from "react";
// import Loading from "../Loading";

function EditingProduct({editing, setEditing}) {
    // const [loading, setLoading] = useState(false);

    function saveEditProduct(e) {
        console.log(e);
        e.preventDefault();
        console.log(`Salvando produto...`);
        setEditing(false);
    }
    function handleChange(e) {
        setEditing({
            ...editing,
            [e.target.name]: e.target.value
        });
        // console.log(data);
        console.log(editing);
    }
    return (
        <section id="editproduct">
            <h3>Editando Produto</h3>
            <form onSubmit={e => saveEditProduct(e)} className=''>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Nome:
                                <input onChange={handleChange} value={editing.name} type="text" name="name" placeholder='Nome do produto'/>
                            </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Preço:
                                <input onChange={handleChange} type="text" value={editing.price} name="price" placeholder='Use valores decimais. ex: 8.50' />
                            </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Categoria:
                                <select value={editing.category} onChange={handleChange} name="category">
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
                                <input value={editing.description} onChange={handleChange} name="description" placeholder='Digite o que pode ser alterado na conta'/>
                            </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Imagem:
                                <input value={editing.image} onChange={handleChange} type="url" name="image" placeholder='URL da imagem'/>
                            </label>
                            </div>
                        </div>
                        <button className='btn' type="submit">Adicionar</button>
                    </form>
        </section>
    );
}
export default EditingProduct;