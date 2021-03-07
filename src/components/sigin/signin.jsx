import React, {Component} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import {Redirect} from "react-router";


class Signin extends Component {

    state = {
        username: "",
        password: "",
        redirect: false
    };

    onUsernameChange = (event) => {
        this.setState({username: event.target.value});
        console.log(this.state.username);
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
        console.log(this.state.password);
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            window.location = "/editProducts"
        }
    };


    login = () => {
        axios.post(`http://localhost:8080/auth/signin`,
            {
                username: this.state.username,
                password: this.state.password
            }
        ).then(resp => {
            console.log(resp.data);
            sessionStorage.setItem("token", resp.data.token);
            //localStorage.setItem("token", resp.data.token);
            this.setState({redirect: true});
        }).catch((e) => {
            console.log(e.message)
        })

    };

    render() {
        return (
            <div>{this.renderRedirect()}
                <div className="container"
                     style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "28rem"}}>
                    <div className="card">
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Username</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" onChange={this.onUsernameChange}
                                           value={this.state.username}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1"
                                           onChange={this.onPasswordChange} value={this.state.password}/>
                                </div>
                            </form>
                            <button className="btn btn-primary" onClick={this.login}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Signin;