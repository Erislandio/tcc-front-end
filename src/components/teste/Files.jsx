import React, { Component } from 'react';
import axios from 'axios'

const base_url = "http://localhost:3000/results/create"

class Files extends Component {

    constructor(props) {
        super(props);

        this.state = {
            file: null,
            erro: '',
            result: false,
            resultado: '',
            condicoes_ambiente: '',
            qualidade: '',
            camera_name: ''
        }

    }

    handleChange(event) {
        event.preventDefault()
        this.setState({
            file: window.URL.createObjectURL(event.target.files[0]) ? window.URL.createObjectURL(event.target.files[0]) : ''
        })
    }

    handleCheckColor = () => {
        const _this = this

        if (this.state.file == null || !this.state.file) {
            this.setState({ erro: 'Selecione a imagem ' })
            setTimeout(() => {
                this.setState({ erro: '' })

            }, 3000);
        } else {
            var img = document.getElementById('img');
            var demoContainer = document.querySelector('.demo-container');
            var tracker = new window.tracking.ColorTracker(['yellow']);
            tracker.on('track', function (event) {
                event.data.forEach(function (rect) {
                    window.plot(rect.x, rect.y, rect.width, rect.height, rect.color);
                });
            });
            window.tracking.track(img, tracker);


            window.plot = function (x, y, w, h, color) {

                _this.setState({ result: true, resultado: "Foram encontrados tons amarelados na imagem " })

                var rect = document.createElement('div');
                document.querySelector('.demo-container').appendChild(rect);
                rect.classList.add('rect');
                rect.style.border = '2px solid ' + color;
                rect.style.width = w + 'px';
                rect.style.height = h + 'px';
                rect.style.left = (img.offsetLeft + x) + 'px';
                rect.style.top = (img.offsetTop + y) + 'px';

            };
        }

        this.sendResult()
    }

    sendResult = () => {

        const user = sessionStorage.getItem('data')
        const jsonUser = JSON.parse(user)
        const { data: { token } } = jsonUser

        const { file, camera_name, tipo, qualidade, resultado, condicoes_ambiente } = this.state

        const data = {
            data: {
                camera_name,
                tipo,
                qualidade,
                imagem: file,
                resultado,
                condicoes_ambiente
            }
        }

        if (jsonUser != null) {

            let headers = {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
            axios.post(
                base_url,
                headers,
                data
            ).then(data => {

                console.log(data)

            })

        }
    }

    render() {

        console.log(this)
        return (
            <div className="file-upload" >
                <div className="demo-frame">
                    <div className="demo-container">
                        <img id="img" src={this.state.file} />
                    </div>
                </div>
                <input type="file" required onChange={event => this.handleChange(event)} />
                <button id="check" type="button" onClick={e => { this.handleCheckColor() }}>
                    inspecionar imagem
                </button>
                {
                    this.state.erro && (
                        <div className="modal-erro">
                            {this.state.erro}
                        </div>
                    )
                }
            </div >
        );
    }
}

export default Files;