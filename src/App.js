import { Fragment } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from "./component/navigation/navigation.component";
import Home from "./routes/home/home.component";
import SignIn from "./routes/signin/signin.component";

const Shop = () => {
  return (
    <h1>
      This is shop
    </h1>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}> 
        <Route index={true} element={<Home/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/signin" element={<SignIn/>}/>
      </Route>
    </Routes>
  )
}

export default App;
