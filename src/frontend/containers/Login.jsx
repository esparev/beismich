import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/components/Login.scss';

const API = 'https://beismich.herokuapp.com/api/v1';

const Login = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Iniciar Sesión';
  }, []);

  const [form, setValues] = useState({
    email: '',
    password: '',
  });

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const login = async (url, data) => {
    await axios
      .post(url, data)
      .then((res) => {
        localStorage.setItem('id', res.data.admin.id);
        localStorage.setItem('name', res.data.admin.name);
        localStorage.setItem('email', res.data.admin.email);
        localStorage.setItem('image', res.data.admin.image);
        localStorage.setItem('role', res.data.admin.role);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('actor image', 'https://i.imgur.com/CFJ2k8J.png');
        localStorage.setItem('league logo', 'https://i.imgur.com/PEZQ6jS.png');
        localStorage.setItem('team logo', 'https://i.imgur.com/chid3RN.png');
        window.location.href = '/';
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(`${API}/auth/iniciar-sesion`, form);
  };

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
          <form className='login__form' onSubmit={handleSubmit}>
            <div className='login__form--email'>
              <input
                className='login__form--input form--input-text'
                name='email'
                type='email'
                placeholder='Correo electrónico'
                onChange={handleInput}
              />
            </div>
            <div className='login__form--password'>
              <input
                className='login__form--input form--input-text'
                name='password'
                type='password'
                id='password'
                minLength='8'
                placeholder='Contraseña'
                onChange={handleInput}
              />
              <span
                className='login__form--password-icon input-icon'
                id='password-icon'
                onClick={togglePassword}
              ></span>
            </div>
            <button type='submit' className='login__form--button'>
              Iniciar Sesión
            </button>
          </form>
          <Link className='login--forgot-password' to='/recuperar-contraseña'>
            ¿Olvidaste tu contraseña?
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Login;
