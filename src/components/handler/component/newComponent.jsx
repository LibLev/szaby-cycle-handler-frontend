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
        productId: "",
        progress: 0,
        previewImages: [],
        temporary: [],
        mainImage: ""
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

    saveProductData = async () => {
        let token = sessionStorage.getItem("token");
        await axios.post("https://szabicycle.herokuapp.com/saveComponent",
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
                console.log(resp.status);
                this.setState({productId:resp.data.id})
            }).catch(e =>{
                console.log(e.message)
            });
    };

    onChangeCheckBox = event => {
        let name = this.state.temporary[event.target.id].name.toString()
        this.setState({mainImage: name})
    }

    fileSelectedHandler = event => {
        let files = event.target.files;
        this.setState({temporary: files})
        let images = [];
        const formData = new FormData();
        for (let i = 0; i < event.target.files.length; i++) {
            images.push(URL.createObjectURL(event.target.files[i]))
        }
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        this.setState({selectedFiles: formData, previewImages: images});
    };

    fileUploadHandler = async () => {
        let token = sessionStorage.getItem("token");
        await axios.post(`https://szabicycle.herokuapp.com/component/upload-multiple-picture/` + this.state.productId,
            this.state.selectedFiles,
            {
                onUploadProgress: progressEvent => {
                    this.setState({progress: Math.round(progressEvent.loaded / progressEvent.total * 100)});
                    console.log("Upload progress" + this.state.progress + "%");
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then(resp => {
            console.log(resp.status);
        })
        await axios.post(`https://szabicycle.herokuapp.com/component/set-main-pic`,
            {
                id: this.state.productId,
                mainImage: this.state.mainImage
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(resp => {
                console.log(resp.status);
            }
        ).catch(e => {
            console.log(e.message)
        })
    };

/*    setMainPic = async () => {
        let token = sessionStorage.getItem("token");
        await axios.post(`https://szabicycle.herokuapp.com/component/set-main-pic`,
            {
                id: this.state.productId,
                mainImage: this.state.mainImage
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(resp => {
                console.log(resp.status);
            }
        ).catch(e => {
            console.log(e.message)
        })
    }

    save = () => {
        this.saveProductData();
        this.fileUploadHandler();
        this.setMainPic();
        this.setState({redirect: true});
    }*/

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
                    <button className="btn btn-secondary" onClick={this.saveProductData}>Adatok hozzáadása</button>
                    <div className="form-group">
                        <div>
                            <label htmlFor="exampleFormControlFile1">Képek kiválasztása</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1" multiple
                                   onChange={this.fileSelectedHandler}/>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.previewImages && (
                            <div className="row">
                                {this.state.previewImages.map((img, i) => {
                                    return (
                                        <div className="col-sm-4" style={{marginTop: "20px"}}>
                                            <div className="card" style={{width: "18rem"}}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio"
                                                           name="flexRadioDefault"
                                                           id={i} onChange={this.onChangeCheckBox} value={img}/>
                                                </div>
                                                <img className="preview card-body" src={img} alt={"image-" + i}
                                                     key={i}/>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: this.state.progress + "%"}}
                         aria-valuenow={this.state.progress}
                         aria-valuemin="0" aria-valuemax="100"/>
                </div>
                <button className="btn btn-secondary" onClick={this.fileUploadHandler}>Képekfeltöltése & Mentés</button>
            </div>
        )
    }
}

export default newComponent;