import React, {Component} from 'react';
import './App.css';
import NavBar from "./components/navbar/navbar";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Signin from "./components/sigin/signin";
import NewBicycle from "./components/handler/bicycle/newBicycle";
import EditBicycles from "./components/handler/bicycle/editBicycles";
import EditBicyclePage from "./components/handler/bicycle/editBicyclePage";
import newComponent from "./components/handler/component/newComponent";
import editComponents from "./components/handler/component/editComponents";
import EditComponentPage from "./components/handler/component/editComponentPage";

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
                                <Route path="/newComponent" component={newComponent}/>
                                <Route path="/editComponents" component={editComponents}/>
                                <Route path="/editComponent" component={EditComponentPage}/>
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
