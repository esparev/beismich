import React, { useEffect } from 'react';
import AdminActor from '../components/AdminActor';
import ButtonContainer from './ButtonContainer';
import YellowButton from '../components/YellowButton';
import useGetAdmins from '../hooks/useGetAdmins';
import { envConfig } from '../utils/config';
import '../assets/styles/components/TeamPlayers.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the admins page with all its functions 
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const Admins = () => {
  // Fetching the necessary data to showcase in the component
  const admins = useGetAdmins(envConfig.apiUrl);

  useEffect(() => {
    document.title = 'BEISMICH • Administradores';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className='admins'>
      <div className='admins__container-card'>
        <div className='players-coach'>
          <section className='admins'>
            <h2 className='admins--title'>Administradores</h2>
            <div className='admins__container'>
              {admins.map((admin) => (
                <AdminActor
                  admin={admin}
                  key={admin.id}
                  name={admin.name}
                  image={admin.image}
                  route={`/admins/admin/${admin.id}`}
                />
              ))}
            </div>
          </section>
        </div>

        <ButtonContainer>
          <YellowButton
            name='Nuevo Administrador'
            route='/admins/nuevo-admin'
          />
        </ButtonContainer>
      </div>
    </main>
  );
};

export default Admins;
