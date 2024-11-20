import React, { useState, useContext, useEffect } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import UserContext from '../UserContext';
import Inventory from '../components/inventory/GWinventory'
import axios from 'axios';

const Workshop = ({ open, handleClose }) => {
  const { userId } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState([]);

  const refresh = () => {
    window.location.reload();
  }


  useEffect(() => {
    // const searchParams = new URLSearchParams(location.search);
    // const user = searchParams.get('userId');
    // console.log('USERID',userId)
    

    axios.get(`http://localhost:8000/api/user/profile/${userId}`)
        .then(response => {
            setUserProfile(response.data.user);
            // console.log(response.data.user)
            // setUsername(response.user.name);
            // console.log('user name:', username);
        })
        .catch(error => {
            console.error('failing to find user:', error);
        });
        // console.log('profile inventory', userProfile)
}, [userId, ]);



const craftIronBar = () => {
  // Ensure userProfile and inventory are available and loaded
  if (userProfile && userProfile.inventory) {
    // Check if there is any 'ironore' in the inventory
    const hasIronOre = userProfile.inventory.some(item => item.name === 'Iron Ore');

    if (hasIronOre) {
      console.log('You have iron ore in your inventory');
      // Add crafting logic here

      
      if (userProfile.inventory.length !== 0) {
        const updateDatabase = async (inventory) => {
          try {
            // Create a new item to add to the inventory
            const newItem = {
              name: 'Iron Bar',
              loot: 1
            };
      
            // Find the index of Iron Ore in the inventory
            const ironOreIndex = inventory.findIndex(item => item.name === 'Iron Ore');
      
            // Log to confirm if Iron Ore exists
            console.log('Iron Ore index:', ironOreIndex);
            if (ironOreIndex !== -1) {
              console.log('Iron Ore found in inventory:', inventory[ironOreIndex]);
            }
      
            // Remove 2 units of Iron Ore (if found)
            if (ironOreIndex !== -1 && inventory[ironOreIndex].loot >= 2) {
              inventory[ironOreIndex].loot -= 2;
              if (inventory[ironOreIndex].loot === 0) {
                inventory.splice(ironOreIndex, 1); // Remove item if loot becomes zero
              }
            } else {
              console.log('Not enough Iron Ore to craft an Iron Bar');
              return;
            }
      
            // Check if Iron Bar already exists in inventory
            const ironBarIndex = inventory.findIndex(item => item.name === 'Iron Bar');
            if (ironBarIndex !== -1) {
              // Update loot count of existing Iron Bar
              inventory[ironBarIndex].loot += 1;
              console.log('Iron Bar updated in inventory:', inventory[ironBarIndex]);
            } else {
              // Add new Iron Bar item to inventory
              inventory.push(newItem);
              console.log('Iron Bar added to inventory:', newItem);
            }
      
            // Log updated inventory
            console.log('Updated Inventory:', inventory);
      
            // Send updated inventory to server
            console.log('Triggered update Database');
            const response = await fetch(`http://localhost:8000/api/${userProfile.googleId}/update-inventory`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ inventory: inventory }),
            });
      
            if (!response.ok) {
              throw new Error('Failed to update inventory');
            }
      
            console.log('Inventory updated successfully');
          } catch (error) {
            console.error('Error updating inventory:', error);
          }
        };
      
        // Call updateDatabase with current userProfile.inventory
        updateDatabase(userProfile.inventory);
        refresh()
      }
      







      
      
    } else {
      console.log('You do not have iron ore in your inventory');
    }
  }
};






  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: 800 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Crafting
          {/* <Inventory inventory={userProfile.inventory} /> */}
        </Typography>
        <Box>
          <Button variant="contained" onClick={craftIronBar}>Iron Bar</Button>
        </Box>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {/* Crafting content goes here */}
        </Typography>
      </Box>
    </Modal>
  );
};

// Style for the modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default Workshop;
