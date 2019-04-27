import React, { Component } from "react";
import tracking from "tracking";
import Webcam from "react-webcam";
import axios from "axios";
import Popup from "../helpers/Popup";

const base_url = "https://backend-tcc.herokuapp.com/results/create";

class Camera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: null,
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

  setRef = webcam => {
    this.webcam = webcam;
  };

  handleRemoveRect = () => {
    let rect = document.querySelectorAll(".rect");
    let i = 0;
    if (rect.length) {
      for (i = 0; i < rect.length; i++) {
        rect[i].remove();
      }
    }
  };

  sendResult = () => {
    const user = sessionStorage.getItem("data");
    const jsonUser = JSON.parse(user);
    const {
      data: { token }
    } = jsonUser;

    const {
      img,
      camera_name,
      tipo,
      qualidade,
      resultado,
      condicoes_ambiente
    } = this.state;

    if (img == null) {
      this.setState({ error: "Clique em capturar primeiro..." });
      setTimeout(() => {
        this.setState({ error: "" });
      }, 3000);
      return;
    }

    const data = {
      camera_name,
      tipo,
      qualidade,
      imagem: "",
      resultado: resultado.length
        ? resultado
        : "Não foram encontrados problemas na imagem",
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

  capture = () => {
    this.handleRemoveRect();
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ img: imageSrc });

    const _this = this;

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
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    return (
      <div className="content-camera">
        <div className="capture-image">
          <Webcam
            audio={false}
            height={400}
            ref={this.setRef}
            screenshotFormat="image/png"
            width={600}
            videoConstraints={videoConstraints}
          />
        </div>
        <div className="demo-frame">
          <div className="demo-container">
            <img id="img" src={this.state.img} width="600px" height="600px" />
          </div>
        </div>

        <div id="resultado">{this.state.resultado}</div>

        <button onClick={this.capture} id="capture">
          Capture photo
        </button>

        <button onClick={() => this.sendResult()} id="capture">
          Salvar resultado
        </button>
        <Popup
          text={this.state.error}
          className={this.state.error ? " show " : " hidden"}
        />
      </div>
    );
  }
}

export default Camera;
