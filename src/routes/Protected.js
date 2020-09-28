import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Protected = (props) => {

  const active = useSelector(state => state.auth.isActive);
  const accessToken = useSelector(state => state.auth.accessToken);

  const { children } = props;
  return (
   <Fragment>
      {
        active && accessToken 
        ? (<Fragment>{ children }</Fragment>)  
        : (<Redirect to={"/"} />)
      }
   </Fragment>
  )
}

export default Protected;
