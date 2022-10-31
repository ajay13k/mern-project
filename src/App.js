import Navbar from "./component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Product from "./component/Product";
import Signup from "./component/Signup";
import Addproduct from "./component/AddProduct";
import UpdateProduct from "./component/UpdateProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/navbar" element={<Navbar />}></Route>
          <Route path="/addproduct" element={<Addproduct />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/update/:id" element={<UpdateProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
