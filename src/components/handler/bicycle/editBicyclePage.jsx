import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import axios from "axios";
import {Redirect} from "react-router";

class EditBicyclePage extends Component {

    state = {
        isLoaded: false,
        data: [],
        name: "",
        brand: "",
        frame: "",
        fork: "",
        groupSet: "",
        shifters: "",
        callipers: "",
        breaks: "",
        seatPost: "",
        saddle: "",
        stem: "",
        handleBar: "",
        barTape: "",
        pedal: "",
        wheels: "",
        details: "",
        price: "",
        typeOfBicycle: "",
        redirect: false
    };

    frameOnChange = event => {
        this.setState({frame: event.target.value})
    };

    forkOnChange = event => {
        this.setState({fork: event.target.value})
    };

    groupSetOnChange = event => {
        this.setState({groupSet: event.target.value})
    };

    shiftersOnChange = event => {
        this.setState({shifters: event.target.value})
    };

    callipersOnChange = event => {
        this.setState({callipers: event.target.value})
    };

    breaksOnChange = event => {
        this.setState({breaks: event.target.value})
    };

    seatPostOnChange = event => {
        this.setState({seatPost: event.target.value})
    };

    saddleOnChange = event => {
        this.setState({saddle: event.target.value})
    };

    stemOnChange = event => {
        this.setState({stem: event.target.value})
    };

    handleBarOnChange = event => {
        this.setState({handleBar: event.target.value})
    };

    barTapeOnChange = event => {
        this.setState({barTape: event.target.value})
    };

    pedalOnChange = event => {
        this.setState({pedal: event.target.value})
    };

    wheelsOnChange = event => {
        this.setState({wheels: event.target.value})
    };

    productNameOnChange = event => {
        this.setState({name: event.target.value})
    };

    productBrandOnChange = event => {
        this.setState({brand: event.target.value})
    };

    productDetailsOnChange = event => {
        this.setState({details: event.target.value})
    };

    productPriceOnChange = event => {
        this.setState({price: event.target.value})
    };


    getProductData = () => {
        axios.get("http://localhost:8080/bicycle/" + localStorage.getItem("productId"))
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
            return <Redirect to="/editBicycles"/>
        }
    };

    updateProduct = () => {
        //let token = localStorage.getItem("token");
        let token = sessionStorage.getItem("token");
        axios.post("http://localhost:8080/updateBicycle", {
            id: this.state.data.id,
            name: this.state.name,
            brand: this.state.brand,
            details: this.state.details,
            price: this.state.price,
            typeOfBicycle: this.state.data.typeOfBicycle,
            frame: this.state.frame,
            fork: this.state.fork,
            groupSet:this.state.groupSet,
            shifters:this.state.shifters,
            callipers:this.state.callipers,
            breaks:this.state.breaks,
            seatPost:this.state.seatPost,
            saddle:this.state.saddle,
            stem:this.state.stem,
            handlebar:this.state.handleBar,
            barTape:this.state.barTape,
            pedal:this.state.pedal,
            wheels:this.state.wheels,
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
                        src={`http://localhost:8080/image/download/${this.state.data.id}/${i}`}
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
                                                                        <table>
                                                                            <tr>
                                                                                <th>Váz</th>
                                                                                <td>
                                                                                    <input onChange={this.frameOnChange} type="text"
                                                                                           placeholder={this.state.data.frame}/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Villa</th>
                                                                                <td><input onChange={this.forkOnChange} type="text"
                                                                                           placeholder={this.state.data.fork}/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Szet</th>
                                                                                <td><input onChange={this.groupSetOnChange} type="text"
                                                                                           placeholder={this.state.data.groupSet}/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Váltó</th>
                                                                                <td><input onChange={this.shiftersOnChange} type="text"
                                                                                           placeholder={this.state.data.shifters}/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Fékváltókar</th>
                                                                                <td><input onChange={this.callipersOnChange} type="text"
                                                                                           placeholder={this.state.data.callipers}/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Fék</th>
                                                                                <td><input onChange={this.breaksOnChange} type="text"
                                                                                           placeholder={this.state.data.breaks}/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Nyeregcső</th>
                                                                                <td><input onChange={this.seatPostOnChange} type="text"
                                                                                           placeholder={this.state.data.seatPost}/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Nyereg</th>
                                                                                <td><input onChange={this.saddleOnChange} type="text"
                                                                                           placeholder={this.state.data.saddle}/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Stucni</th>
                                                                                <td><input onChange={this.stemOnChange} type="text"
                                                                                           placeholder={this.state.data.stem}/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Kormány</th>
                                                                                <td><input onChange={this.handleBarOnChange} type="text"
                                                                                           placeholder={this.state.data.handlebar}/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Bandázs/Markolat</th>
                                                                                <td><input onChange={this.barTapeOnChange} type="text"
                                                                                           placeholder={this.state.data.barTape}/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Pedál</th>
                                                                                <td><input onChange={this.pedalOnChange} type="text"
                                                                                           placeholder={this.state.data.pedal}/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Kerekek</th>
                                                                                <td><input onChange={this.wheelsOnChange} type="text"
                                                                                           placeholder={this.state.data.wheels}/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th>Egyéb adatok</th>
                                                                                <td><textarea onChange={this.productDetailsOnChange} type="text"
                                                                                              className="form-control"
                                                                                              id="exampleFormControlInput1"
                                                                                              rows="2"
                                                                                              placeholder={this.state.data.details}/>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
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

export default EditBicyclePage;