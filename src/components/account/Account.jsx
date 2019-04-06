import React, { Component } from "react";
import Loader from "../helpers/Loader";
import "./account.css";
import { Link } from "react-router-dom";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: true
    };
  }

  componentDidMount() {
    this.setState({ loader: false });
  }

  render() {
    const results = this.props.results["results"];
    const { user } = this.props.user.data;
    console.log(this);
    console.log(results);
    return this.state.loader && results.length == 0 ? (
      <Loader />
    ) : (
      <div className="account" id="account">
        <div
          className={"spot-user " + (results == false ? " " : " user-results ")}
        >
          <div className="content-user">
            <h1 className="user-title">Usuário</h1>
            <h2 className="name-user">Nome: {user.name}</h2>
            <h2 className="name-user email">Email: {user.email}</h2>
          </div>
        </div>
        <div className="resultados-wrapper">
          {results.length == 0 ? (
            <div className="results">
              <h1 className="results-title">Resultados</h1>
              <div className="not-results">
                <h2 className="title-not">
                  Não foram encontrados Resultados.
                  <Link to="teste/camera" className="link-camera">
                    Clique aqui para realizar o teste com a camera
                  </Link>
                </h2>
              </div>
            </div>
          ) : (
            <div className="results-content">
              <h1 className="results-title">
                Resultados encontrados: {results.length}
              </h1>
              {results.map((result, i) => {
                console.log(result);
                return (
                  <div className="result-card" key={i}>
                    <p className="contagem-result">
                      <b className="date-b">Data do teste:</b>
                      {new Date(result.data_resultado).toLocaleString()}
                    </p>
                    <div className="result-text">
                      <b className="result-b">Resultado gerado:</b>
                      <span>{result.resultado}</span>
                      <span className="cond">
                        <b className="amb-b">Condições de ambiente:</b>
                        {result.condicoes_ambiente}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Account;
