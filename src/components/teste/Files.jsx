import React, { Component } from "react";
import axios from "axios";
import Popup from "../helpers/Popup";

const base_url = "https://backend-tcc.herokuapp.com/results/create";

class Files extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      erro: "",
      result: false,
      resultado: "",
      condicoes_ambiente: new Date(),
      qualidade: "Alta",
      camera_name: "indefinida",
      error: "",
      event: "",
      result: null
    };
  }

  handleChange(event) {
    event.preventDefault();
    this.setState(
      {
        event: event.target,
        file: event.target.files[0]
          ? window.URL.createObjectURL(event.target.files[0])
          : ""
      },
      () => {
        this.handleRemoveRect();
      }
    );
  }

  handleRemoveRect = () => {
    let rect = document.querySelectorAll(".rect");
    let i = 0;
    if (rect.length) {
      for (i = 0; i < rect.length; i++) {
        rect[i].remove();
      }
    }
  };

  handleCheckColor = () => {
    const _this = this;

    if (this.state.file == null || !this.state.file) {
      this.setState({ erro: "Selecione a imagem " });
      setTimeout(() => {
        this.setState({ erro: "" });
      }, 3000);
    } else {
      var img = document.getElementById("img");
      var demoContainer = document.querySelector(".demo-container");
      var tracker = new window.tracking.ColorTracker(["yellow"]);
      tracker.on("track", function(event) {
        event.data.forEach(function(rect) {
          window.plot(rect.x, rect.y, rect.width, rect.height, rect.color);
        });
      });
      window.tracking.track(img, tracker);

      window.plot = function(x, y, w, h, color) {
        _this.setState({
          result: true,
          resultado: "Foram encontrados tons amarelados na imagem "
        });

        var rect = document.createElement("div");
        document.querySelector(".demo-container").appendChild(rect);
        rect.classList.add("rect");
        rect.style.border = "2px solid " + color;
        rect.style.width = w + "px";
        rect.style.height = h + "px";
        rect.style.left = img.offsetLeft + x + "px";
        rect.style.top = img.offsetTop + y + "px";
      };
    }
  };

  sendResult = () => {
    const user = sessionStorage.getItem("data");
    const jsonUser = JSON.parse(user);
    const {
      data: { token }
    } = jsonUser;

    const {
      file,
      camera_name,
      tipo,
      qualidade,
      resultado,
      condicoes_ambiente
    } = this.state;

    const data = {
      camera_name,
      tipo,
      qualidade,
      imagem: file,
      resultado,
      condicoes_ambiente: condicoes_ambiente.getHours() > 18 ? "Noite" : "Dia"
    };

    console.log(data);

    if (jsonUser != null) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios.post(base_url, data).then(data => {
        console.log(data);
        if (data.statusText == "OK") {
          this.setState({ error: "Resutados foram salvos com sucesso." });
          setTimeout(() => {
            this.setState({ error: "", result: false, resultado: "" });
            this.handleRemoveRect();
          }, 4000);
        } else {
          this.setState({ error: "Não foi possível salvar os dados" });
          setTimeout(() => {
            this.handleRemoveRect();
            this.setState({ error: "", result: false, resultado: "" });
          }, 4000);
        }
      });
    }
  };

  render() {
    console.log(this);
    return (
      <div className="file-upload">
        <div className="demo-frame">
          <div className="demo-container">
            <img id="img" src={this.state.file} />
            <div className="imagem-results">
              {this.state.result && this.state.resultado
                ? this.state.resultado
                : "Não foram encontrados tons amarelados na imagem."}
            </div>
          </div>
        </div>
        <input
          type="file"
          required
          onChange={event => this.handleChange(event)}
        />
        <button
          id="check"
          type="button"
          onClick={e => {
            this.handleCheckColor();
          }}
        >
          inspecionar imagem
        </button>
        {this.state.result ? (
          <button
            id="check"
            type="button"
            onClick={e => {
              this.sendResult();
            }}
          >
            Salvar Resultado
          </button>
        ) : null}

        {this.state.erro && <div className="modal-erro">{this.state.erro}</div>}

        <Popup
          text={this.state.error}
          className={this.state.error ? " show " : " hidden"}
        />
      </div>
    );
  }
}

export default Files;
