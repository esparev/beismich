import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Actor.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the admin actor component with all its functions
 * stored inside for its full operation
 * @param {*} props
 * @returns JSX code to render to the DOM tree
 */
const AdminActor = (props) => {
  // Parameters that the function will receive
  const { name, image, position, route } = props;

  return (
    <Link className='admin__card' to={route}>
      <img className='admin__card--image' src={image} alt='Foto de perfil' />
      <div className='admin__card-info'>
        <h3 className='admin__card-info--name'>{name}</h3>
        {position ? <p className='admin__card--position'>{position}</p> : null}
      </div>
    </Link>
  );
};

export default AdminActor;
