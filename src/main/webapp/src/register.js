import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AppNavbar from './layout/nav';
import Footer from './layout/footer';
import Auth from "./module/auth";

const required = value => {
    if (!value) {
        return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
                );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);

        this.state = {
            username: "",
            loading: false,
            message: "",
            errorMessage: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            errorMessage: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            Auth.register(this.state.username).then(
                    () => {
                this.setState({
                    loading: false,
                    message: "User Registered Successfully!"
                });
            },
                    error => {
                        const resMessage =
                                (error.response &&
                                        error.response.data &&
                                        error.response.data.message) ||
                                error.message ||
                                error.toString();

                        this.setState({
                            loading: false,
                            errorMessage: resMessage
                        });
                    }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (<div>
            <AppNavbar/>  
            <div className="Container">
                <Form
                    onSubmit={this.handleRegister} ref={c => {
                                    this.form = c;
                                }} className = "p-3">
        
                    <h1 className="h3 my-5 text-muted">Register</h1> 
        
                    {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-success" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                                        )}
        
                    {this.state.errorMessage && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.errorMessage}
                                </div>
                            </div>
                                        )}
        
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            validations={[required]}
                            />
                    </div>                
                    <div className="form-group">
                        <button
                            className="btn btn-primary btn-block"
                            disabled={this.state.loading}
                            >
                            {this.state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                                                )}
                            <span>Register</span>
                        </button>
                    </div>
        
                    <CheckButton
                        style={{display: "none"}} ref={c => {
                                        this.checkBtn = c;
                                    }}
                        />
                </Form>
            </div>
            <Footer/>
        </div>
                );
    }
}