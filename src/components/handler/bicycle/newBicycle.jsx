import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import {Redirect} from "react-router";

class NewBicycle extends Component {

    state = {
        name: "",
        brand: "",
        frame: "",
        fork:"",
        groupSet:"",
        shifters:"",
        callipers:"",
        breaks:"",
        seatPost:"",
        saddle:"",
        stem:"",
        handleBar:"",
        barTape:"",
        pedal:"",
        wheels:"",
        details: "",
        price: "",
        typeOfBicycle: "",
        selectedFiles: null,
        imgUris: [],
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

    onChangeProductType = event => {
        this.setState({typeOfBicycle: event.target.value});
        console.log(this.state.productType);
    };

    fileSelectedHandler = event => {
        console.log(localStorage.getItem("token"));
        let files = event.target.files;
        const formData = new FormData;
        const names = [];
        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i], files[i].name);
            names.push(files[i].name);
        }
        this.setState({selectedFiles: formData});
        this.setState({imgUris: names})
    };

    fileUploadHandler = async () => {
        let token = localStorage.getItem("token");
        await axios.post("http://localhost:8080/uploadMultipleFiles",
            this.state.selectedFiles,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then(resp => {
            console.log(resp);
            console.log(this.state.imgUris)
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/editBicycles"/>
        }
    };

    saveProduct = async () => {
        let token = localStorage.getItem("token");
        await axios.post("http://localhost:8080/saveBicycle",
            {
                name: this.state.productName,
                brand: this.state.productBrand,
                details: this.state.productDetails,
                price: this.state.productPrice,
                productType: this.state.productType,
                imgUris: this.state.imgUris.toString()
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(console.log(this.state))
            .then(resp => {
                console.log(resp);
                this.setState({redirect: true})
            });
    };

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <div className="container">
                    <div className="form-group">
                        <div>
                            <label htmlFor="exampleFormControlFile1">Képek kiválasztása</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1" multiple
                                   onChange={this.fileSelectedHandler}/>
                        </div>
                        <button onClick={this.fileUploadHandler}>Képek feltöltése</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Kerékpár típusa</label>
                        <select name="productType" onChange={this.onChangeProductType}>
                            <option value="none">None</option>
                            <option value="road">Országúti</option>
                            <option value="track">Pálya</option>
                            <option value="gravel">Gravel</option>
                            <option value="cycleCross">CycleCross</option>
                            <option value="mountain">MTB</option>
                            <option value="trekking">Trekking</option>
                            <option value="city">City</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Termék neve</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="De Rosa King" onChange={this.productNameOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Márka</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="De Rosa" onChange={this.productBrandOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Váz</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="De Rosa King CF" onChange={this.frameOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Villa</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="De Rosa King fullcarbon" onChange={this.forkOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Szett</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Campagnolo Super Record" onChange={this.groupSetOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Váltók</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Campagnolo Record" onChange={this.shiftersOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Fékváltókar</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Campagnolo Record" onChange={this.callipersOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Fékek</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Campagnolo Record" onChange={this.breaksOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Nyeregcső</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Deda" onChange={this.seatPostOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Nyereg</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Selle Italia" onChange={this.saddleOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Stucni</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Deda" onChange={this.stemOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Kormány</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Deda" onChange={this.handleBarOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Bandázs/Markolat</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Deda" onChange={this.barTapeOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Pedál</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Look kéo" onChange={this.pedalOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Kerekek</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Mavic Cosmic" onChange={this.wheelsOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Adatok</label>
                        <textarea type="text" className="form-control" id="exampleFormControlInput1" rows="10"
                                  onChange={this.productDetailsOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Ár</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="100" onChange={this.productPriceOnChange}/>
                    </div>
                    <button className="btn btn-secondary" onClick={this.saveProduct}>Mentés</button>
                </div>
            </div>
        )
    }
}

export default NewBicycle;