import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Message from '../components/Message';
import ButtonContainer from './ButtonContainer';
import RedButton from '../components/RedButton';
import DeleteMessage from '../components/DeleteMessage';
import toggleMessage from '../utils/functions/toggleMessage';
import countCharacters from '../utils/functions/countCharacters';
import updateThumbnail from '../utils/functions/updateThumbnail';
import { authConfig } from '../utils/constants';
import { envConfig } from '../utils/config';
import '../assets/styles/components/CreateEntity.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the edit news page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const EditNews = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Editar Noticia';
    window.scrollTo(0, 0);

    var elTxtA = document.getElementById('textarea');
    var elIn = document.getElementById('input');

    elTxtA.addEventListener('keyup', countCharacters, false);
    elIn.addEventListener('keyup', countCharacters, false);

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

    ReactDOM.render(
      <Message message='Subiendo imagen' messageStatus='upload' />,
      document.getElementById('message-container')
    );
    setTimeout(() => {
      ReactDOM.render(
        <Message message='Se ha subido la imagen' messageStatus='success' />,
        document.getElementById('message-container')
      );
    }, 1500);
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
   * Sends a patch request to the URL of the API provided
   * with the data entered by the user in a form along
   * with a bearer token included in the headers configuration
   * @param {string} url - API URL
   * @param {json} data - body data to post
   * @param {json} config - headers configuration
   */
  const editNews = async (url, data, config) => {
    await axios
      .patch(url, data, config)
      .then((res) => {
        ReactDOM.render(
          <Message
            message='¡Noticia editada con éxito!'
            messageStatus='success'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      })
      .catch((error) => {
        ReactDOM.render(
          <Message
            message={`¡Ups!, Hubo un error al editar la noticia. 
            Verifique los datos que haya ingresado`}
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      });
  };

  /**
   * Sends a delete request to the URL of the API provided
   * to delete the selected news according to its id along
   * with a bearer token included in the headers configuration
   * @param {string} url - API URL
   * @param {json} config - headers configuration
   */
  const deleteNews = async (url, config) => {
    await axios
      .delete(url, config)
      .then((res) => {
        toggleMessage();
        ReactDOM.render(
          <Message
            message='¡Noticia eliminada con éxito!'
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
            message={`¡Ups!, Hubo un error al eliminar la noticia. 
            Inténtelo más tarde`}
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editNews(
      `${envConfig.apiUrl}/noticias/${localStorage.getItem('selected news')}`,
      form,
      authConfig
    );
  };

  const handleDelete = () => {
    deleteNews(
      `${envConfig.apiUrl}/noticias/${localStorage.getItem('selected news')}`,
      authConfig
    );
  };

  return (
    <>
      <div id='message-container'></div>

      <DeleteMessage entity='noticia' onClick={handleDelete} />

      <main className='create-container'>
        <form className='form' onSubmit={handleSubmit}>
          <h1 className='form--title'>Editar Noticia</h1>
          <div>
            <input
              className='input'
              name='title'
              type='text'
              id='input'
              placeholder='Titulo'
              onChange={handleInput}
            />
            <div className='input-count' id='input-count'>
              <span id='input-current'>0</span>
              <span id='input-maximum'>/255</span>
            </div>
          </div>
          <div>
            <textarea
              className='input'
              name='description'
              type='text'
              id='textarea'
              placeholder='Descripción'
              maxLength='1000'
              onChange={handleInput}
            ></textarea>
            <div className='input-count' id='textarea-count'>
              <span id='textarea-current'>0</span>
              <span id='textarea-maximum'>/1000</span>
            </div>
          </div>

          <label className='form--label label' htmlFor='file'>
            Portada de la noticia
          </label>
          <div className='form__image' id='drop-zone'>
            <input
              className='form__image--input'
              type='file'
              id='file'
              accept='image/*'
            />
            <div className='form__image-labels'>
              <span className='form__image--label drop-zone--prompt'>
                Arrastra una imagen
              </span>
              <span className='form__image--label-button drop-zone--prompt'>
                O haz clic aquí para subir una imagen
              </span>
            </div>
          </div>

          <ButtonContainer>
            <button type='submit' className='button yellow-button'>
              Guardar Cambios
            </button>
            <RedButton name='Eliminar Noticia' onClick={toggleMessage} />
          </ButtonContainer>
        </form>
      </main>
    </>
  );
};

export default EditNews;
