import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import {Redirect} from "react-router";

class EditProductCard extends Component {

    state = {
        redirect: false
    };

    deleteProduct = () => {
        let token = localStorage.getItem("token");
        axios.delete("http://localhost:8080/deleteProduct/" + this.props.data.id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            console.log(resp.data);
        }).catch((e) => {
            console.log(e.message)
        });
        window.location.reload()
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/editProduct"/>
        }
    };

    openProductPage = () => {
        localStorage.setItem("productId", this.props.data.id);
        this.setState({redirect: true})
    };

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <div className="col-sm-4" style={{marginTop: "20px"}}>
                    <div className="card" style={{width: "18rem"}}>
                        <img className="card-img-top"
                             src={`http://localhost:8080/downloadFile/${this.props.data.imgUris[0]}`}
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

export default EditProductCard;