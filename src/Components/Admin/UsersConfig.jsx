import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Loading from '../Loading';

function UsersConfig() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    function reloadList() {
        setLoading(true);
        axios.post('http://'+window.location.hostname+'/api/admin/getUsers.php', {
            user_id: sessionStorage.getItem('user_id')
        })
        .then(function (response) {
            let result = response.data;
            if (result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                setUsers(result);
                setLoading(false);
            }
        })
        .catch(function (error) {
            console.log('Um erro aconteceu mas só Deus sabe qual.' + error);
            setLoading(false);
        });
    }

    function setBanned (id) {
        setLoading(true);
        axios.post('http://'+window.location.hostname+'/api/admin/setBanned.php', {
            user_id: sessionStorage.getItem('user_id'),
            id: id
        })
        .then(function (response) {
            let result = response.data;
            if (result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                setSuccess(result.success);
                setLoading(false);
                reloadList();
            }
        })
        .catch(function (error) {
            console.log('Um erro aconteceu mas só Deus sabe qual.' + error);
            setLoading(false);
        });
    }
    
    function setUnbanned (id) {
        setLoading(true);
        axios.post('http://'+window.location.hostname+'/api/admin/setUnbanned.php', {
            user_id: sessionStorage.getItem('user_id'),
            id: id
        })
        .then(function (response) {
            let result = response.data;
            if (result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                setSuccess(result.success);
                setLoading(false);
                reloadList();
            }
        })
        .catch(function (error) {
            console.log('Um erro aconteceu mas só Deus sabe qual.' + error);
            setLoading(false);
        });
    }
    function setClient (id) {
        setLoading(true);
        axios.post('http://'+window.location.hostname+'/api/admin/setClient.php', {
            user_id: sessionStorage.getItem('user_id'),
            id: id
        })
        .then(function (response) {
            let result = response.data;
            if (result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                setSuccess(result.success);
                setLoading(false);
                reloadList();
            }
        })
        .catch(function (error) {
            console.log('Um erro aconteceu mas só Deus sabe qual.' + error);
            setLoading(false);
        });
    }
    function setAdmin (id) {
        setLoading(true);
        axios.post('http://'+window.location.hostname+'/api/admin/setAdmin.php', {
            user_id: sessionStorage.getItem('user_id'),
            id: id
        })
        .then(function (response) {
            let result = response.data;
            if (result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                setSuccess(result.success);
                setLoading(false);
                reloadList();
            }
        })
        .catch(function (error) {
            console.log('Um erro aconteceu mas só Deus sabe qual.' + error);
            setLoading(false);
        });
    }

    useEffect(() => {
        setLoading(true);
        axios.post('http://'+window.location.hostname+'/api/admin/getUsers.php', {
            user_id: sessionStorage.getItem('user_id')
        })
        .then(function (response) {
            let result = response.data;
            if (result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                setUsers(result);
                setLoading(false);
            }
        })
        .catch(function (error) {
            console.log('Um erro aconteceu mas só Deus sabe qual.' + error);
            setLoading(false);
        });
    }, []);

    function closeButton(closed) {
        closed === 'error' && setError(false);
        closed === 'success' && setSuccess(false);
    }

    if (loading) return <Loading />;

    return (
        <div className="usersadmin">
            <section id="manipulateusers">
                <h3>Lista de usuários</h3>
                {error && <div className="alert alert-danger" role="alert">{error} <button onClick={() => closeButton('error')} className="button-close-alert no-style"><i className="fa-solid fa-xmark"></i></button></div>}
                {success && <div className="alert alert-success" role="alert">{success} <button onClick={() => closeButton('success')} className="button-close-alert no-style"><i className="fa-solid fa-xmark"></i></button></div>}
                <div className="table-container">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Celular</th>
                                <th>Status</th>
                                <th>Função</th>
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
                                    <td>{user.status === "1" ? 'Ativo' : 'Banido'}</td>
                                    <td>{user.function === "1" ? 'Admin' : 'Usuário'}</td>
                                    <td className='actions'>
                                        {user.status === "1" && <button onClick={() => setBanned(user.id)} className="button-table close"><i className="fa-solid fa-user-xmark"></i></button>}
                                        {user.status === "0" && <button onClick={() => setUnbanned(user.id)} className="button-table check"><i className="fa-solid fa-user-check"></i></button>}
                                        {user.function === "1" && <button onClick={() => setClient(user.id)} className="button-table edit"><i className="fa-solid fa-user-minus"></i></button>}
                                        {user.function === "0" && <button onClick={() => setAdmin(user.id)} className="button-table edit"><i className="fa-solid fa-user-plus"></i></button>}
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