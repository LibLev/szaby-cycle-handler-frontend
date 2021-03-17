import React, {Component} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import BicycleCard from "./handler/bicycle/editBicycleCard";
import ComponentCard from "./handler/component/editComponentCard";


class MainPage extends Component {

    state = {
        bicycles: [],
        components: []
    };

    getBicycles = () => {
        axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
        axios.get(`https://szabicycle.herokuapp.com/get-all-bicycle`)
            .then((response) => {
                    console.log(response.status);
                    this.setState({bicycles: response.data})
                },
                (error) => {
                    console.log(error)
                }
            )
    };

    getComponents = () => {
        axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
        axios.get(`https://szabicycle.herokuapp.com/get-all-component`)
            .then((response) => {
                    console.log(response.status);
                    this.setState({components: response.data})
                },
                (error) => {
                    console.log(error)
                }
            )
    };

    componentDidMount() {
        this.getBicycles();
        this.getComponents();
    }

    render() {
        return (
            <div className="container-md">
                <h5>Legutóbb hozzáadott kerékpárok:</h5>
                <div className="row">
                    {this.state.bicycles.slice(Math.max(this.state.bicycles.length - 3, 0)).map((d) => (<BicycleCard data={d}/>))}
                </div>
                <h5>Legutóbb hozzáadott alkatrészek:</h5>
                <div className="row">
                    {this.state.components.slice(Math.max(this.state.components.length - 3, 0)).map((d) => (<ComponentCard data={d}/>))}
                </div>
            </div>
        )
    }
}

export default MainPage;