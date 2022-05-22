import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      redirecionar: false,
      isButtonDisabled: true,
      carregar: false,
      nameUser: '',
    };
  }

  validarButton=({ target }) => {
    const nameMin = 3;
    const nameNum = target.value;
    if (nameNum.length >= nameMin) {
      this.setState({
        isButtonDisabled: false,
        nameUser: target.value,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  onClickButton = async () => {
    const { state } = this;
    this.setState({ carregar: true });
    await createUser({ name: state.nameUser });
    this.setState({ carregar: false, redirecionar: true });
  };

  render() {
    const { state } = this;
    return (
      <p className="imagem">
        <div className="login-page">
          <div className="textButton" data-testid="page-login">
            {state.carregar ? <Carregando />
              : (
                <>
                  <h2 className="titulo">LAI TUNES</h2>
                  <input
                    className="input-login"
                    placeholder="Nome"
                    data-testid="login-name-input"
                    type="text"
                    onChange={ this.validarButton }
                  />
                  <button
                    className="btn-login"
                    disabled={ state.isButtonDisabled }
                    type="submit"
                    data-testid="login-submit-button"
                    onClick={ this.onClickButton }
                  >

                    Entrar
                  </button>
                  {state.redirecionar && <Redirect to="/search" />}
                </>
              )}
          </div>
        </div>
      </p>
    );
  }
}

export default Login;
