import { Link } from "react-router-dom";
import React, { Component } from 'react';
import './login.css'
import Popup from '../helpers/Popup';
import axios from 'axios'
import Loader from "../helpers/Loader";

const base_url = "https://backend-tcc.herokuapp.com/auth/authenticate"


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            erro: '',
            loader: false
        }

    }

    loginUser(e) {
        e.preventDefault()

        this.setState({ loader: true })

        const { email, password } = this.state


        axios({
            url: base_url,
            method: 'post',
            data: {
                email,
                password
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(data => {

            const { data: { Erro } } = data

            if (Erro) {
                this.setState({ erro: Erro, loader: false })
                setTimeout(() => {
                    this.setState({ erro: '' })
                }, 4000);
            } else {
                sessionStorage.setItem('data', JSON.stringify(data))
                window.location.href = "/account"
            }
        })
    }

    render() {
        return (
            <div className="login-form">
                <form className="form-login" onSubmit={e => this.loginUser(e)}>
                    {
                        this.state.loader ? (
                            <Loader />
                        ) : (
                                <div className="content-login">
                                    <h3 className="login-title">Login</h3>
                                    <div className="inputs">
                                        <span className="span-label">
                                            <input
                                                required
                                                type="text"
                                                placeholder="email"
                                                name="email"
                                                onChange={e => this.setState({ email: e.target.value })}
                                            />
                                        </span>
                                        <span className="span-label">
                                            <input
                                                required
                                                type="password"
                                                placeholder="senha"
                                                name="password"
                                                onChange={e => this.setState({ password: e.target.value })}
                                            />
                                        </span>
                                        <span className="span-label">
                                            <button type="submit" className="btn btn-login">Entrar</button>
                                        </span>
                                        <span className="reset-pass">
                                            Ainda não tem cadastro?
                                    <Link className="register-link" to="/register/">Clique aqui!</Link>
                                        </span>
                                    </div>
                                </div>
                            )
                    }

                    <Popup text={this.state.erro} className={this.state.erro ? ' show ' : ' hidden'} />
                </form>
            </div>
        );
    }
}

export default Login;