import React, { Component } from 'react';

export default class Footer extends Component {

    render() {
        return <footer className="container my-5">
            <hr/>
            <ul className="nav justify-content-center">
                <li className="nav-item"><a href="/" className="nav-link text-muted">Example.com &copy; {new Date().getFullYear()} </a></li>
            </ul>
        </footer>;

    }
}