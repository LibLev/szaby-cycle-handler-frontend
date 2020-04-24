import React, {Component} from 'react';
import './App.css';
import NavBar from "./components/navbar/navbar";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import newProduct from "./components/handler/newProduct";
import Signin from "./components/sigin/signin";
import editProducts from "./components/handler/editProducts";
import editProductPage from "./components/handler/editProductPage";

class App extends Component {


    render() {
        return (
            <div>
                {localStorage.getItem("token") ? (
                <div>
                    <NavBar/>
                    <div className="container-md" style={{marginTop: "30px"}}>
                        < BrowserRouter>
                            <Switch>
                                <Route path="/newProduct" component={newProduct}/>
                                <Route path="/editProducts" component={editProducts}/>
                                <Route path="/editProduct" component={editProductPage}/>
                            </Switch>
                        </BrowserRouter>
                    </div>
                </div>) :
                    (<Signin />)}
            </div>
        );
    }
}

export default App;
