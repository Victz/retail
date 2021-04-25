import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import AppNavbar from './layout/nav';
import Footer from './layout/footer';
import Auth from "./module/auth";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: Auth.getCurrentUser(),
            profile: undefined,
            debts: [],
            credits: [],
            transactions: [],
            isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('/api/profile', {headers: Auth.authHeader()})
                .then(response => response.json())
                .then(data => this.setState({profile: data}));
        fetch('/api/debts', {headers: Auth.authHeader()})
                .then(response => response.json())
                .then(data => this.setState({debts: data}));
        fetch('/api/credits', {headers: Auth.authHeader()})
                .then(response => response.json())
                .then(data => this.setState({credits: data}));
        fetch('/api/transactions', {headers: Auth.authHeader()})
                .then(response => response.json())
                .then(data => this.setState({transactions: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/transaction/${id}`, {
            method: 'DELETE',
            headers: Auth.authHeader()
        }).then(() => {
            let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
            this.setState({transactions: updatedGroups});
        });
    }

    render() {
        const {currentUser, profile, debts, credits, transactions, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const transactionList = transactions.map(transaction => {
            return <tr key={transaction.id}>
                <td style={{whiteSpace: 'nowrap'}}>{transaction.user.username}</td>
                <td >{transaction.type}</td>
                <td>{transaction.amount}</td>
                <td >{transaction.createdBy}</td>
                <td  className="text-right">{transaction.lastModifiedDate}</td>
            </tr>
        });

        const debtList = debts.map(debt => {
            return <p className="text-danger">Owning {debt.amount} to {debt.creditor.username}.</p>
        });
        const creditList = credits.map(credit => {
            return <p className="text-success">Owning {credit.amount} from {credit.debitor.username}.</p>
        });

        return (
                <div>
                    <AppNavbar/>
                    <Container>
                        <header className="jumbotron">
                            <h3>
                                Hello, <strong>{currentUser.username}</strong>! 
                            </h3>
                            <p className="text-primary">Your Balance is {profile.balance}</p>
                            {debtList}{creditList}                
                            <Link className="btn btn-primary" to="/topup"  >Top Up</Link>
                            <p className="mt-3">
                                <strong>Token:</strong>{" "}
                                {currentUser.accessToken.substring(0, 20)} ...{" "}
                                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                            </p>
                            <strong>Authorities:</strong>
                            <ul>
                                {currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                            </ul>       
                        </header>                
                        <Link className="btn btn-primary float-right" to="/pay" >Pay</Link>                
                        <h3>Transactions</h3>   
                        <Table>
                            <thead>
                                <tr>
                                    <th>Owner</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Created By</th>
                                    <th className="text-right">Transaction Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionList}
                            </tbody>
                        </Table>
                    </Container>
                    <Footer/>
                </div>
                );
    }
}