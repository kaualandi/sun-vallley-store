import React, {useState, useEffect} from 'react';
import Loading from '../Loading';
import EditingUser from './EditingUser';

function UsersConfig() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    // const [error, setError] = useState(false);

    function editUser(id) {
        setEditing(id);
    }
    function dropUser(id) {
        console.log(`Removendo produto ${id}`);
    }

    useEffect(() => {
        setLoading(true);
        setUsers([
            {
                id: 0,
                name: 'Kauã Landi',
                email: 'kaualandi@hotmail.com',
                phone: '+55 (21) 99999-9999',
                status: 1,
                power: 1,
            },
            {
                id: 1,
                name: 'João Silva',
                email: 'damo@host.com',
                phone: '+55 (11) 99999-9999',
                status: 1,
                power: 0,
            },
            {
                id: 2,
                name: 'Bruno Almeida',
                email: 'damo@host.com',
                phone: '+55 (99) 99999-9999',
                status: 0,
                power: 0,
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
        return <EditingUser setEditing={setEditing} editing={editing}/>;
    }
    return (
        <div className="usersadmin">
            <section id="manipulateusers">
                <h3>Lista de usuários</h3>
                <div className="table-container">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Celular</th>
                                <th>Status</th>
                                <th>Poder</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.status ? 'Ativo' : 'Banido'}</td>
                                    <td>{user.power ? 'Admin' : 'Usuário'}</td>
                                    <td className='actions'><button onClick={() => editUser(user)} className="button-table edit"><i className="fa-solid fa-pen"></i></button> <button onClick={() => dropUser(user.id)} className="button-table delete"><i className="fa-solid fa-trash"></i></button>
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
export default UsersConfig;