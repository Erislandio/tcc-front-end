import React, { Component } from 'react';
import tracking from 'tracking'
import Webcam from 'react-webcam'

class Camera extends Component {


    constructor(props) {
        super(props);

        this.state = {
            img: null,
            resultado: {
                resultado: '',
                ambiente: '',
                qualidade: '',
                tipo: '',
                camera: ''
            }
        }

    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.setState({ img: imageSrc })

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
                        height={600}
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


                <div id="resultado"></div>

                <button onClick={this.capture} id="capture">Capture photo</button>

            </div>
        );
    }
}

export default Camera;