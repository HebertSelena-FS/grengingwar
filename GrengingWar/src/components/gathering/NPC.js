import React, { useState } from "react";
import './npc.css';
import Workshop from "../../pages/workshop";
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const NPC = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    event.stopPropagation(); // Prevent triggering the parent onClick
    setOpen(true);
  };

  const handleClose = () => setOpen(false);



  return (
    <div className="npc-btn" id={props.id} atk={props.atk ? 'active' : 'inactive'} onClick={props.onClick}>
      <div>{props.name}</div>
      <div>Type: {props.type}</div>
      <div className="health">{props.health}</div>
     
      {/* Conditionally rendering a button for opening the workshop */}
       {/* Conditionally rendering the button */}
       {props.content ? (
        <button className="npc-workshop-btn" variant="contained" height='100px' color="primary" onClick={handleOpen}>
          Open
        </button>
      ) : (
        <div className="npc-reload">
          {props.isDisabled ? 'Reloading' : 'Attack'}
        </div>
      )}
      {/* Include the Workshop component */}
      <Workshop  open={open} handleClose={handleClose} />
    </div>
  );
};

export default NPC;
