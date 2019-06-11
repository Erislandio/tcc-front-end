import React, { Component } from 'react';
import SpotContato from './SpotContato';
import './contatos.css'
import wagner from '../../assets/img/wagner.jpeg'
import eris from '../../assets/img/eris.jpg'
import ronaldo from '../../assets/img/ronaldo.jpg'
import tiago from '../../assets/img/tiago.jpg'


class Contatos extends Component {
    render() {
        return (
            <div className="contentos" id="contatos">
                <div className="content-contatos">
                    <h1 className="equipe">
                        Equipe
                    </h1>
                    <div className="contatos">
                        <ul>
                            <SpotContato 
                            email="erislandiosoares@gmail.com" 
                            name="Erislândio Soares" 
                            desc="Estudante de ensino superior FATEC" 
                            imagem={eris} />
                            <SpotContato 
                            email="ronaldogodoi2@gmail.com" 
                            name="Ronaldo Caetano" 
                            desc="Estudante de ensino superior FATEC" 
                            imagem={ronaldo} />
                             <SpotContato 
                            imagem={tiago} 
                            email="tiagobucciarelli20@gmai.com" 
                            name="Tiago Bucciarelli 
                            " desc="Estudante de ensino superior FATEC" />
                            <SpotContato email="wagner.wesley.leme96@gmail.com" name="Wagner Leme" desc="Estudante de ensino superior FATEC" imagem={wagner}/>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contatos;