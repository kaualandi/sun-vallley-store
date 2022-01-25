import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import Register from "./Components/Register";
import RescurePass from "./Components/RescurePass";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import './App.css';

function App() {
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
