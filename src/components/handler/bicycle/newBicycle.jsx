import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import {Redirect} from "react-router";

class NewBicycle extends Component {

    state = {
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
        bicycleId: "",
        selectedFiles: null,
        imgUris: [],
        progress: 0,
        redirect: false,
        previewImages: [],
        temporary: [],
        mainImage: ""
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
    };

    onChangeCheckBox = event => {
        let name = this.state.temporary[event.target.id].name.toString()
        this.setState({mainImage: name})
    }

    saveProductData = async () => {
        let token = sessionStorage.getItem("token");
        await axios.post("https://szabicycle.herokuapp.com/saveBicycle",
            {
                name: this.state.name,
                brand: this.state.brand,
                details: this.state.details,
                price: this.state.price,
                typeOfBicycle: this.state.typeOfBicycle,
                frame: this.state.frame,
                fork: this.state.fork,
                groupSet: this.state.groupSet,
                shifters: this.state.shifters,
                callipers: this.state.callipers,
                breaks: this.state.breaks,
                seatPost: this.state.seatPost,
                saddle: this.state.saddle,
                stem: this.state.stem,
                handlebar: this.state.handleBar,
                barTape: this.state.barTape,
                pedal: this.state.pedal,
                wheels: this.state.wheels,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(resp => {
                console.log(resp.status);
                this.setState({bicycleId: resp.data.id})
            })
            .catch(e => {
                console.log(e.message)
            });
    };

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
        console.log(this.state.mainImage)
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/editBicycles"/>
        }
    };

    fileUploadHandler = async () => {
        let token = sessionStorage.getItem("token");
        await axios.post(`https://szabicycle.herokuapp.com/bicycle/upload-multiple-picture/` + this.state.bicycleId,
            this.state.selectedFiles,
            {
                onUploadProgress: progressEvent => {
                    this.setState({progress: Math.round(progressEvent.loaded / progressEvent.total * 100)});
                    console.log("Upload progress" + this.state.progress + "%");
                },
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            }
        ).then(resp => {
            console.log(resp.status);
        }).catch(e => {
            console.log(e.message)
        })
    };

    setMainPic = async () => {
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
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <div className="container">
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

export default NewBicycle;