import React, {Component} from 'react';
import './App.css';
import NavBar from "./components/navbar/navbar";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Signin from "./components/sigin/signin";
import NewBicycle from "./components/handler/bicycle/newBicycle";
import EditBicycles from "./components/handler/bicycle/editBicycles";
import EditBicyclePage from "./components/handler/bicycle/editBicyclePage";

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
                                <Route path="/newBicycle" component={NewBicycle}/>
                                <Route path="/editBicycles" component={EditBicycles}/>
                                <Route path="/editBicycle" component={EditBicyclePage}/>
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
