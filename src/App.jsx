import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import Register from "./Components/Register";
import RescurePass from "./Components/RescurePass";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Help from "./Components/Help";
import Error from "./Components/Error";
import Account from "./Components/Account";
import './App.css';

function App() {
  const error404menssage = "Essa página que você acessou foi movida, está se escondendo em quarentena ou nunca existiu.";
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route exact path="/entrar" element={<Login/>}/>
          <Route exact path="/cadastrar" element={<Register/>}/>
          <Route exact path="/recuperar-senha" element={<RescurePass/>}/>
          <Route exact path="/produtos" element={<Products/>}/>
          <Route exact path="/carrinho" element={<Cart/>}/>
          <Route exact path="/ajuda" element={<Help/>}/>
          <Route exact path="/conta" element={<Account/>}/>
          <Route exact path="*" element={<Error errorCode={'404'} errorMessage={error404menssage}/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;