import React, {Component} from 'react';
import './App.css';
import NavBar from "./components/navbar/navbar";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Signin from "./components/sigin/signin";
import NewBicycle from "./components/handler/bicycle/newBicycle";
import EditBicycles from "./components/handler/bicycle/editBicycles";
import EditBicyclePage from "./components/handler/bicycle/editBicyclePage";
import newComponent from "./components/handler/component/newComponent";
import editComponents from "./components/handler/component/editComponents";
import EditComponentPage from "./components/handler/component/editComponentPage";
import MainPage from "./components/mainPage";

class App extends Component {

    render() {
        return (
            <div>
                <Router>
                    {sessionStorage.getItem("token") ? (
                            <div>
                                <NavBar/>
                                <div className="container-md" style={{marginTop: "30px"}}>
                                    <Route path="/newBicycle" component={NewBicycle}/>
                                    <Route path="/editBicycles" component={EditBicycles}/>
                                    <Route path="/editBicycle" component={EditBicyclePage}/>
                                    <Route path="/newComponent" component={newComponent}/>
                                    <Route path="/editComponents" component={editComponents}/>
                                    <Route path="/editComponent" component={EditComponentPage}/>
                                    <Route path="/home" component={MainPage}/>
                                    <MainPage />
                                </div>
                            </div>) :
                        (<Signin/>)}
                </Router>
            </div>
        );
    }
}

export default App;
