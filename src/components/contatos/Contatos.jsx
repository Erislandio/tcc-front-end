import React, { Component } from 'react';
import SpotContato from './SpotContato';
import './contatos.css'
import wagner from '../../assets/img/wagner.jpeg'


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
                            imagem="https://media.licdn.com/dms/image/C4D03AQFFE9DcDcwiZQ/profile-displayphoto-shrink_200_200/0?e=1557964800&v=beta&t=lMG2gZdvBgms39nGIv01g2LnyLFKAK7UintBiCeoOR8" />
                            <SpotContato 
                            email="ronaldogodoi2@gmail.com" 
                            name="Ronaldo Caetano" 
                            desc="Estudante de ensino superior FATEC" 
                            imagem="https://media.licdn.com/dms/image/C4D03AQF47TJR4qVGRw/profile-displayphoto-shrink_800_800/0?e=1557964800&v=beta&t=T9NUGCZ_8Fu6a3G__fR-zIY_ZMXSo_nYwYxA-CFtIho" />
                             <SpotContato 
                            imagem="https://media.licdn.com/dms/image/C4E03AQE0UYg5leADMw/profile-displayphoto-shrink_800_800/0?e=1557964800&v=beta&t=BfJS0We-A2_WRK24FrwZTMUJcMHmGIDEEhKnaUylLJ0" 
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