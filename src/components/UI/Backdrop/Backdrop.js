import React from 'react';
import classes from './Backdrop.css'
const backDrop = ({ show, clicked }) => {
  if (show) return (<div className = {classes.Backdrop} onClick = {clicked}></div>);
  return null;
}

export default backDrop;
