import React, { Component } from 'react'
import './header.css'
import { Container } from 'reactstrap'

import { Link } from "react-router-dom";


class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    logout(e) {
        e.preventDefault()
        sessionStorage.setItem('data', null)
        window.location.href = '/login'
    }

    render() {
        console.log(this)
        const { user } = this.props
        return (
            <header className="header">
                <Container>
                    <div className="header-content container">
                        <div className="logo">
                            <Link to="/home">
                                <img src="https://ronaldo-caetano.000webhostapp.com/Logo%20png.png" height="25" width="65" alt="SeeEye" />
                            </Link>
                        </div>
                        <nav className={" nav " + (this.state.open ? ' open ' : '')}>
                            <ul>
                                {
                                    this.props.user ? (
                                        <li className="menu-a item-hover" onClick={e => this.setState({ open: !this.state.open })}>Testes
                                            <div className="dropdown-menu-1">
                                                <ul>
                                                    <li className="dropdown-item">
                                                        <Link to="/teste/camera">Camera</Link>
                                                    </li>
                                                    <li className="dropdown-item">
                                                        <Link to="/teste/file">Imagem</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    ) : null
                                }

                                <li className="menu-a" onClick={e => this.setState({ open: !this.state.open })}>
                                    <Link to="/contatos/">
                                        Contatos
                                    </Link>
                                </li>
                                <li className="menu-a" onClick={e => this.setState({ open: !this.state.open })}>
                                    <Link to="/sobre/">
                                        Sobre
                                    </Link>
                                </li>
                                <li className="login-a-mobile" onClick={e => this.setState({ open: !this.state.open })}>
                                    {
                                        user ? (
                                            <React.Fragment>
                                                <Link to="/account">
                                                    {
                                                        'Account'
                                                    }
                                                </Link>

                                                <li className="logout" onClick={e => this.logout(e)}>
                                                    Logout
                                                </li>

                                            </React.Fragment>
                                        ) : (
                                                <Link to="/login">login</Link>
                                            )
                                    }
                                </li>
                            </ul>
                        </nav>
                        <div className="login">
                            {
                                user ? (
                                    <React.Fragment>
                                        <Link to="/account">
                                            {
                                                user.name.split(' ')[0]
                                            }
                                        </Link>
                                        <div className="drop-down-account">
                                            <ul>
                                                <li className
                                                    ="logout" onClick={e => this.logout(e)}>
                                                    Logout
                                                </li>
                                                <li>
                                                    <Link to="/account">
                                                        Account
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </React.Fragment>
                                ) : (
                                        <Link to="/login">login</Link>
                                    )
                            }
                        </div>
                        <div className={"container-menu " + (this.state.open ? ' change ' : '')} onClick={e => this.setState({ open: !this.state.open })}>
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                        </div>
                    </div>
                </Container>
            </header >

        );
    }
}

export default Header;