import React from 'react';
import HeaderContents from './HeaderContents';
import AdminContent from './AdminContent';
import './Styles/Admin.css';

function Admin() {
    return (
        <div className="admin">
            <HeaderContents title={'Painel Admin'}/>
            <div className="adminsidebar container-fluid">
                <div className="row flex-nowrap">
                    <div id='sidebar' className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className="nav-item">
                                    <a href="#dashboard" className="nav-link align-middle px-0">
                                        <i className="fa-solid fa-house"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#orders" className="nav-link align-middle px-0">
                                    <i className="fa-solid fa-hand-holding-box"></i> <span className="ms-1 d-none d-sm-inline">Pedidos</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#products" className="nav-link align-middle px-0">
                                    <i className="fa-solid fa-basket-shopping-simple"></i> <span className="ms-1 d-none d-sm-inline">Produtos</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#users" className="nav-link align-middle px-0">
                                    <i className="fa-solid fa-user-gear"></i> <span className="ms-1 d-none d-sm-inline">Usuários</span>
                                    </a>
                                </li>
                                {/* <li className="nav-item">
                                    <a href="#expense" className="nav-link align-middle px-0">
                                    <i className="fa-solid fa-chart-line-down"></i> <span className="ms-1 d-none d-sm-inline">Despesas</span>
                                    </a>
                                </li> */}
                                {/* <li>
                                    <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                        <i className="fs-4 bi-bootstrap"></i> <span className="ms-1 d-none d-sm-inline">Bootstrap</span></a>
                                    <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                        <li className="w-100">
                                            <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 1</a>
                                        </li>
                                        <li>
                                            <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">Products</span> </a>
                                        <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                        <li className="w-100">
                                            <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 1</a>
                                        </li>
                                        <li>
                                            <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 2</a>
                                        </li>
                                        <li>
                                            <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 3</a>
                                        </li>
                                        <li>
                                            <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 4</a>
                                        </li>
                                    </ul>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                    <div id='contentarea' className="col py-3">
                        <AdminContent />
                    </div>
                </div>
            </div>
            
        </div>
    );
}
export default Admin;