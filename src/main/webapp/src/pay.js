import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AppNavbar from './layout/nav';
import Footer from './layout/footer';
import axios from "axios";
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

export default class Pay extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePayee = this.onChangePayee.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);

        this.state = {
            payee: "",
            amount: 0,
            loading: false,
            message: ""
        };
    }

    onChangePayee(e) {
        this.setState({
            payee: e.target.value
        });
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {

            const options = {
                headers: Auth.authHeader()
            };
            axios.post("/api/transaction/pay", {payee: this.state.payee, amount: this.state.amount}, options).then(
                    () => {
                this.props.history.push("/home");
                window.location.reload();
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
                            message: resMessage
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
                    onSubmit={this.onSubmit} ref={c => {
                                    this.form = c;
                                }} className = "p-3">
        
                    <h1 className="h3 my-5 text-muted">Pay</h1> 
        
                    {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                                        )}
                    <div className="form-group">
                        <label htmlFor="payee">Payee</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="payee"
                            value={this.state.payee}
                            onChange={this.onChangePayee}
                            validations={[required]}
                            />
                    </div> 
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <Input
                            type="number"
                            min="0"
                            step=".01"
                            className="form-control"
                            name="amount"
                            value={this.state.amount}
                            onChange={this.onChangeAmount}
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
                            <span>Pay</span>
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