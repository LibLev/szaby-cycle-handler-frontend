import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import {Redirect} from "react-router";

class newComponent extends Component {

    state = {
        productName: "",
        productBrand: "",
        productDetails: "",
        productPrice: "",
        productType: "",
        selectedFiles: null,
        imgUris: [],
        redirect: false,
        productId: ""
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

    onChangeProductType = event => {
        this.setState({productType: event.target.value});
        console.log(this.state.productType);
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/editComponents"/>
        }
    };

    saveProduct = async () => {
        let token = sessionStorage.getItem("token");
        await axios.post("/saveComponent",
            {
                name: this.state.productName,
                brand: this.state.productBrand,
                details: this.state.productDetails,
                price: this.state.productPrice,
                typeOfComponent: this.state.productType,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(resp => {
                console.log(resp);
                this.setState({productId:resp.data.id})
            }).catch(e =>{
                console.log(e.message)
            });
    };

    fileSelectedHandler = event => {
        let files = event.target.files;
        const formData = new FormData;
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        this.setState({selectedFiles: formData});
    };

    fileUploadHandler = async () => {
        let token = sessionStorage.getItem("token");
        await axios.post(`/component/upload-multiple-picture/` + this.state.productId,
            this.state.selectedFiles,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then(resp => {
            console.log(resp);
            this.setState({redirect: true});
        })
    };

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <div className="container">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Termék típusa</label>
                        <select name="productType" onChange={this.onChangeProductType}>
                            <option value="none">None</option>
                            <option value="break">Fék</option>
                            <option value="handlebar">Kormány</option>
                            <option value="stem">Stucni</option>
                            <option value="seatPost">Nyeregcső</option>
                            <option value="saddle">Nyereg</option>
                            <option value="bartape">Bandázs/Markolat</option>
                            <option value="crankSet">Hajtás</option>
                            <option value="shifter">Váltó</option>
                            <option value="groupSet">Szett</option>
                            <option value="wheel">Kerék</option>
                            <option value="pedal">Pedál</option>
                            <option value="frame">Váz</option>
                            <option value="fork">Villa</option>
                            <option value="calliper">Fékkar/Fékváltókar</option>
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
                    <div className="form-group">
                        <div>
                            <label htmlFor="exampleFormControlFile1">Képek kiválasztása</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1" multiple
                                   onChange={this.fileSelectedHandler}/>
                        </div>
                        <button onClick={this.fileUploadHandler}>Képek feltöltése</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default newComponent;