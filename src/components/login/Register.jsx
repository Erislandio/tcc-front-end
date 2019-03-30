import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
import Popup from '../helpers/Popup';
import Loader from '../helpers/Loader';


const base_url = "https://backend-tcc.herokuapp.com"

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            name: "",
            password: "",
            erro: '',
            loader: false
        }

    }

    handleRegisterUser = (e) => {

        e.preventDefault()
        this.setState({ loader: true })

        const { name, email, password } = this.state

        axios({
            url: `${base_url}/auth/register`,
            method: 'post',
            data: {
                name,
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
                }, 3000);
            } else {
                sessionStorage.setItem('data', JSON.stringify(data))
                window.location.href = "/account"
            }
        })
    }

    render() {
        console.log(this)
        return (
            this.state.loader ? (
                <Loader />
            ) : (
                    <div className="login-form">
                        <form className="form-login" onSubmit={e => this.handleRegisterUser(e)}>
                            <div className="content-login">
                                <h3 className="login-title">Welcome!</h3>
                                <div className="inputs">
                                    <span className="span-label">
                                        <input
                                            required
                                            type="text"
                                            placeholder="Nome"
                                            onChange={e => this.setState({ name: e.target.value })} />
                                    </span>
                                    <span className="span-label">
                                        <input
                                            required
                                            type="text"
                                            placeholder="Email"
                                            onChange={e => this.setState({ email: e.target.value })} />
                                    </span>
                                    <span className="span-label">
                                        <input
                                            required
                                            type="password"
                                            placeholder="Senha"
                                            onChange={e => this.setState({ password: e.target.value })} />
                                    </span>
                                    <span className="span-label">
                                        <button type="submit" className="btn btn-login register">Criar</button>
                                    </span>
                                </div>
                            </div>
                            <Popup text={this.state.erro} className={this.state.erro ? ' show ' : ' hidden'} />
                        </form>
                    </div>
                )
        );
    }
}

export default Register;