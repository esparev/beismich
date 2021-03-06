import React, { useEffect } from 'react';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import useGetAdmin from '../hooks/useGetAdmin';
import { envConfig } from '../utils/config';
import '../assets/styles/components/ActorContainer.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the profile page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const Profile = () => {
  // Assigns the admin's id from the local storage
  // that was defined after a successful login
  const id = localStorage.getItem('id');

  // Fetching the necessary data to showcase in the component
  const admin = useGetAdmin(envConfig.apiUrl, id);

  // Setting the admin's id to have data persistency only on local storage
  localStorage.setItem('selected admin', id);

  useEffect(() => {
    document.title = 'BEISMICH • Administrador';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className='profile'>
      <section className='actor'>
        <div className='actor__container'>
          <img
            className='actor__container--image'
            src={admin.image}
            alt='Foto del administrador'
          />
          <div className='actor__info'>
            <h1 className='actor__info--name'>{admin.name}</h1>
            <div className='actor__info-about'>
              <p>
                <strong>Correo electrónico: </strong>
                {admin.email}
              </p>
            </div>
          </div>
        </div>

        <ButtonContainer>
          <GrayButton
            name='Editar Perfil'
            route={`/admins/admin/${id}/editar-admin`}
          />
        </ButtonContainer>
      </section>
    </main>
  );
};

export default Profile;
