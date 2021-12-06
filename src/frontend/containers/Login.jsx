import React, { useEffect } from 'react';
import '../assets/styles/components/Login.scss';
import viewIcon from '../assets/icons/view-icon.png';
import privateIcon from '../assets/icons/private-icon.png';

const Login = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Iniciar Sesión';
  }, []);

  const togglePassword = () => {
    var passwd = document.getElementById('password');
    var passwdIcon = document.getElementById('password-icon');
    if (passwd.type === 'password') {
      passwd.type = 'text';
      passwdIcon.classList.add('view-icon');
    } else {
      passwd.type = 'password';
      passwdIcon.classList.remove('view-icon');
    }
  };

  return (
    <div className='main-login'>
      <section className='greeting'>
        <h1 className='greeting--title'>Inicia Sesión</h1>
      </section>
      <section className='greeting-desktop'>
        <h1 className='greeting--title'>Bienvenido de Nuevo</h1>
      </section>

      <main className='login-main'>
        <section className='login'>
          <div className='login__greet'>
            <h2 className='login__greet--title'>Bienvenido de Nuevo</h2>
            <p className='login__greet--message'>
              ¡Hola!, inicia sesión para continuar
            </p>
          </div>
          <div className='login__greet-desktop'>
            <h2 className='login__greet--title'>Inicia Sesión</h2>
            <p className='login__greet--message'>
              ¡Hola!, inicia sesión para continuar
            </p>
          </div>
          <form className='login__form' action=''>
            <div className='login__form--email'>
              <input
                className='login__form--input form--input-text'
                type='email'
                placeholder='Correo electrónico'
              />
            </div>
            <div className='login__form--password'>
              <input
                className='login__form--input form--input-text'
                type='password'
                id='password'
                placeholder='Contraseña'
              />
              <span
                className='login__form--password-icon input-icon'
                id='password-icon'
                // src={privateIcon}
                // alt='Icono contraseña'
                onClick={togglePassword}
              ></span>
            </div>
            <button className='login__form--button'>Iniciar Sesión</button>
          </form>
          <a className='login--forgot-password' href='#'>
            ¿Olvidaste tu contraseña?
          </a>
        </section>
      </main>
    </div>
  );
};

export default Login;