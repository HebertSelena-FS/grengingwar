import React, { useState, useEffect } from 'react';
import GWheader from "../components/header/GWheader"
import Tabs from "../components/devportal/Tabs"
import "./devportal.css"
import axios, { Axios } from 'axios';

function DevPortal() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [startingLevel, setStartingLevel] = useState('');

  // Updates the name 
  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  // Updates the type 
  const handleTypeChange = (event) => {
    setType(event.target.value);
  }

  // Updates the starting level 
  const handleStartingLevelChange = (event) => {
    setStartingLevel(event.target.value);
  }

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Send data to backend server for database insertion
      const response = await axios.post(
        'http://localhost:8000/levels/add',
        {
          name,
          type,
          startingLevel
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
      // Handle response as needed
      if (response.status === 200) {
        // Data inserted successfully
        console.log('Data inserted successfully');
      } else {
        // Error handling
        console.error('Error inserting data:', response.statusText);
      }
    } catch (error) {
      // Handle specific request-related errors
      console.error('Error inserting data:', error.message);
    }
  }
  
  return (
    <div>
      <GWheader title="Grenging war" />
      <Tabs />
      <div className="portal-resources-add-container">
        <h1>Level-add</h1>
        <div className="portal-resources-add-row">
          <label htmlFor="name" className="portal-resources-add-label">Name</label>
          <input id="name" type="text" value={name} onChange={handleNameChange} />
        </div>
        <div className="portal-resources-add-row">
          <label htmlFor="type" className="portal-resources-add-label">Type</label>
          <input id="type" type="text" value={type} onChange={handleTypeChange} />
        </div>
        <div className="portal-resources-add-row">
          <label htmlFor="startingLevel" className="portal-resources-add-label">Starting Level</label>
          <input id="startingLevel" type="number" value={startingLevel} onChange={handleStartingLevelChange} />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default DevPortal;