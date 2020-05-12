import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import axios from "axios";
import {Redirect} from "react-router";

class EditComponentPage extends Component {

    state = {
        isLoaded: false,
        data: [],
        productName: "",
        productBrand: "",
        productDetails: "",
        productPrice: "",
        redirect: false
    };

    productNameOnChange = event => {
        this.setState({productName: event.target.value})
    };

    productBrandOnChange = event => {
        this.setState({productBrand: event.target.value})
    };

    productDetailsOnChange = event => {
        this.setState({productDetails: event.target.value})
    };

    productPriceOnChange = event => {
        this.setState({productPrice: event.target.value})
    };


    getProductData = () => {
        axios.get("http://localhost:8080/component/" + localStorage.getItem("productId"))
            .then((response) => {
                    this.setState({data: response.data});
                    this.setState({isLoaded: true})
                },
                (error) => {
                    console.log(error)
                })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/editComponents"/>
        }
    };

    updateProduct = () => {
        let token = localStorage.getItem("token");
        axios.post("http://localhost:8080/updateComponent", {
            id: this.state.data.id,
            name: this.state.productName,
            brand: this.state.productBrand,
            details: this.state.productDetails,
            price: this.state.productPrice,
            componentType: this.state.data.componentType,
            imgUris: this.state.data.imgUris.toString()
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            console.log(resp.data);
            this.setState({redirect: true})
        }).catch((e) => {
            console.log(e.message)
        })
    };

    componentDidMount() {
        this.getProductData();
    };

    createImgs = () => {
        let imgs = [];
        for (let i = 0; i < this.state.data.imgUris.length; i++) {
            imgs.push(
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`http://localhost:8080/downloadFile/${this.state.data.imgUris[i]}`}
                        alt="Third slide"
                    />
                    <Carousel.Caption/>
                </Carousel.Item>
            )
        }
        return imgs;
    };


    render() {
        return (
            <div>
                {this.renderRedirect()}
                <div>
                    {this.state.isLoaded ? (
                            <div className="container-sm">
                                <div className="container bootstrap snippet">
                                    <div className="row ng-scope">
                                        <div className="col-md-4">
                                            <div className="panel panel-default">
                                                <div className="panel-body text-center">
                                                    <Carousel>
                                                        {this.createImgs()}
                                                    </Carousel>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <div className="h4 text-center"><b>{this.state.data.name}</b></div>
                                                    <div className="row pv-lg">
                                                        <div className="col-lg-3"/>
                                                        <div className="col-lg-8">
                                                            <form className="form-horizontal ng-pristine ng-valid">
                                                                <div className="form-group">
                                                                    <label className="col-sm-2 control-label"
                                                                           htmlFor="inputContact1"><b>Termék
                                                                        neve:</b></label>
                                                                    <div className="col-sm-10">
                                                                        <input onChange={this.productNameOnChange}
                                                                               type="text"
                                                                               placeholder={this.state.data.name}/>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-sm-2 control-label"
                                                                           htmlFor="inputContact1"><b>Márka:</b></label>
                                                                    <div className="col-sm-10">
                                                                        <input onChange={this.productBrandOnChange}
                                                                               type="text"
                                                                               placeholder={this.state.data.brand}/>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-sm-2 control-label"
                                                                           htmlFor="inputContact1"><b>Adatok:</b></label>
                                                                    <div className="col-sm-10">
                                                                    <textarea onChange={this.productDetailsOnChange}
                                                                              placeholder={this.state.data.details}
                                                                              rows="10"/>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-sm-2 control-label"
                                                                           htmlFor="inputContact1"><b>Ár:</b></label>
                                                                    <div className="col-sm-10">
                                                                        <input onChange={this.productPriceOnChange}
                                                                               type="text"
                                                                               placeholder={this.state.data.price}/>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                            <div>
                                                                <button onClick={this.updateProduct}>Mentés</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        : "Loading"}
                </div>
            </div>
        )
    }
}

export default EditComponentPage;