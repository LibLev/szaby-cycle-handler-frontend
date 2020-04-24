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
            localStorage.setItem("token", resp.data.token);
            this.setState({redirect: true});
        }).catch((e) => {
            console.log(e.message)
        })

    };

    render() {
        return (
            <div className="container-md" style={{marginTop: "30px"}}>
                <div>
                    {this.renderRedirect()}
                    <div className="container-sm">
                        <div className="card text-sm-center" style={{ margin: "0 auto",
                            float: "none",
                            marginBottom: "10px"}}>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" name="username" value={this.state.username}
                                               onChange={this.onUsernameChange}
                                               placeholder="username"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" value={this.state.password}
                                               onChange={this.onPasswordChange} placeholder="password"/>
                                    </div>
                                </form>
                                <button type="button" className="btn-primary" onClick={this.login}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Signin;