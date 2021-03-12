import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import {Redirect} from "react-router";

class EditComponentCard extends Component {

    state = {
        redirect: false,
        redirect2: false
    };

    getIndexOfMainPic = () => {
        let result = 0;
        for (let i = 0; i < this.props.data.imgUris.length; i++) {
            if (this.props.data.imgUris[i] === this.props.data.imgUri){
                result = i;
                break
            }
        }
        return result;
    }

    deleteProduct = () => {
        let token = sessionStorage.getItem("token");
        axios.delete("/deleteComponent/" + this.props.data.id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            console.log(resp.data);
        }).catch((e) => {
            console.log(e.message)
        });
        this.setState({redirect2 : true})
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/editComponent"/>
        }
    };

    renderRedirect2() {
        if (this.state.redirect2) {
            setTimeout(function (){window.location.reload()}.bind(this), 3000);
        }
    }

    openProductPage = () => {
        localStorage.setItem("productId", this.props.data.id);
        this.setState({redirect: true})
    };

    render() {
        return (
            <div>
                {this.renderRedirect()}
                {this.renderRedirect2()}
                <div className="col-sm-4" style={{marginTop: "20px"}}>
                    <div className="card" style={{width: "18rem"}}>
                        <img className="card-img-top"
                             src={`/component/image/download/${this.props.data.id}/${this.getIndexOfMainPic()}`}
                             alt="Card image cap" style={{height: "70%"}}/>
                        <div className="card-body">
                            <p className="card-text"> {this.props.data.name}</p>
                        </div>
                        <div className="d-inline">
                            <FontAwesomeIcon icon={faTrash} style={{marginRight: "10px"}} onClick={this.deleteProduct}/>
                            <FontAwesomeIcon icon={faPen} onClick={this.openProductPage}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default EditComponentCard;