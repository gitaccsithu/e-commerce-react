import { Fragment } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from "./component/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}> 
        <Route index={true} element={<Home/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/authentication" element={<Authentication/>}/>
      </Route>
    </Routes>
  )
}

export default App;
