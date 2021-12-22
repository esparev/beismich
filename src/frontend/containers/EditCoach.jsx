import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Message from '../components/Message';
import ButtonContainer from './ButtonContainer';
import RedButton from '../components/RedButton';
import DeleteMessage from '../components/DeleteMessage';
import ImageUploader from '../functions/ImageUploader';
import toggleMessage from '../functions/toggleMessage';
import updateThumbnail from '../functions/updateThumbnail';
import '../assets/styles/components/CreateEntity.scss';

const API = 'https://beismich.herokuapp.com/api/v1';

const EditCoach = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Editar Entrenador';
    window.scrollTo(0, 0);

    // Opaque date placeholder until it has been modified
    var dateEl = document.getElementById('date');
    dateEl.onchange = function () {
      if (dateEl.value === '') {
        dateEl.classList.add('empty');
      } else {
        dateEl.classList.remove('empty');
      }
    };

    // Select closest container for the input
    document.querySelectorAll('.form__image--input').forEach((inputElement) => {
      const dropZoneElement = inputElement.closest('.form__image');

      /**
       * Updates the image thumbnail after change is detected in the
       * image drop zone
       */
      inputElement.addEventListener('change', (e) => {
        if (inputElement.files.length) {
          updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
      });

      /**
       * Event listener when file is being dragged over the drop zone
       * Activates CSS indicator to let the user know that they have
       * dragged the item over the drop zone
       */
      dropZoneElement.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZoneElement.classList.add('drop-zone__over');
      });

      /**
       * Event listener when the file isn't being dragged
       */
      ['dragleave', 'dragend'].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
          dropZoneElement.classList.remove('drop-zone__over');
        });
      });
    });
  }, []);

  /**
   * Re assigns the form image value after a storage event
   * has been dispatched, which means that an image has been
   * uploaded to the app
   */
  window.onstorage = () => {
    form.cover = localStorage.getItem('uploaded image');
  };

  /**
   * Sets the initial values for the form fields
   */
  const [form, setValues] = useState({});

  /**
   * Sets values after onChange event is triggered on the
   * indicated inputs
   */
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Authorization header configuration for API request
   */
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  /**
   * Sends a patch request to the URL of the API provided
   * with the data entered by the user in a form along
   * with a bearer token included in the headers configuration
   * @param {*} url - API URL
   * @param {*} data - body data to post
   * @param {*} config - headers configuration
   */
  const editCoach = async (url, data, config) => {
    await axios
      .patch(url, data, config)
      .then((res) => {
        ReactDOM.render(
          <Message
            message='¡Entrenador editado con éxito!'
            messageStatus='success'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      })
      .catch((error) => {
        ReactDOM.render(
          <Message
            message='¡Ups!, Hubo un error al editar el entrenador'
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      });
  };

  /**
   * Sends a delete request to the URL of the API provided
   * to delete the selected coach according to its id along
   * with a bearer token included in the headers configuration
   * @param {*} url - API URL
   * @param {*} config - headers configuration
   */
  const deleteCoach = async (url, config) => {
    await axios
      .delete(url, config)
      .then((res) => {
        toggleMessage();
        ReactDOM.render(
          <Message
            message='¡Entrenador eliminado con éxito!'
            messageStatus='success'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      })
      .catch((error) => {
        toggleMessage();
        ReactDOM.render(
          <Message
            message='¡Ups!, Hubo un error al eliminar el entrenador'
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editCoach(
      `${API}/entrenadores/${localStorage.getItem('selected coach')}`,
      form,
      config
    );
  };

  const handleDelete = () => {
    deleteCoach(
      `${API}/entrenadores/${localStorage.getItem('selected coach')}`,
      config
    );
  };

  return (
    <>
      <div id='message-container'></div>

      <DeleteMessage entity='entrenador' onClick={handleDelete} />

      <main className='create-container'>
        <form className='form' onSubmit={handleSubmit}>
          <h1 className='form--title'>Editar Entrenador</h1>
          <input
            className='input'
            name='name'
            type='text'
            placeholder='Nombre'
            onChange={handleInput}
          />
          <label className='form--label label' htmlFor='date'>
            Fecha de nacimiento
          </label>
          <input
            className='input empty'
            name='birthday'
            type='date'
            id='date'
            placeholder='Fecha de nacimiento'
            onChange={handleInput}
          />

          <label className='form--label label' htmlFor='file'>
            Foto del Entrenador
          </label>
          <div className='form__image form__image-square' id='drop-zone'>
            <input
              className='form__image--input form__image-square--input'
              type='file'
              id='file'
              accept='image/*'
            />
            <div className='form__image-labels form__image-square-labels'>
              <span
                className='
                form__image--label form__image-square--label
                drop-zone--prompt
              '
              >
                Arrastra una imagen
              </span>
              <span
                className='
                form__image--label-button form__image-square--label-button
                drop-zone--prompt
              '
              >
                O haz clic aquí para subir una imagen
              </span>
            </div>
          </div>
          <ButtonContainer>
            <button type='submit' className='button yellow-button'>
              Guardar Cambios
            </button>
            <RedButton name='Eliminar Entrenador' onClick={toggleMessage} />
          </ButtonContainer>
        </form>
      </main>

      <ImageUploader />
    </>
  );
};

export default EditCoach;
