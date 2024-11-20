// import React from 'react';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./home.css"
import GWNav from "../components/nav/GWNav"
import GWheader from "../components/header/GWheader"
import GWinventory from "../components/inventory/GWinventory";
import GWsector from "../components/map/GWsector";
// import GWresource from "./Components/gathering/GWresource";
import GWlevels from "../components/statsandinfo/GWlevels";
import GWresourceheld from "../components/resources/GWresource";
import GWplayertag from "../components/player/GWplayertag";
import GWmap from "../components/map/GWmap";
import NPC from "../components/gathering/NPC"
//utils 
import Timer from '../Utils/Tick';
import { NPCDATA, spawn34, spawn44 } from "../datafiles/NPC";
import content from "../Utils/MapContent";
import { GameProvider } from '../Utils/GameData';
import { useLocation } from 'react-router-dom';
import useNavigateToWorkshop from '../components/customroutes/useNavigateToWorkshop';
import Workshop from './workshop';
import UserContext from '../UserContext'



function Home() {

    //---------------navigation variables -----------
    const navigateToWorkshop = useNavigateToWorkshop();

    // -------------- min max damage --------------
    function rng(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }
    // ----------- spawn code ---------------------
     function toggle() {
        setatk(!atk);
        // for (let reload = seconds; reload === 0; attack)
        // console.log(reload)
    }
   
   
    const [data, setdata] = useState(spawn44)
    

    function spawns(name) {
        const newspawns = [...data, { name }];
        setdata(newspawns)
    };
    
    // ---------- food healing -----------
    // const [foodcount, setfoodcount] = useState(10);
    // const fooddamage = () =>{if (foodcount > 0 ) { setfoodcount(foodcount - 1)}};

    // ----------- profile fetching variables --------------------
    const location = useLocation();
    const [userProfile, setUserProfile] = useState([]);
    const [username, setUsername] = useState('');
    const { User, userId, loading } = useContext(UserContext);
    
    // adds resources to the counter for held items
    const [food, setfood] = useState(10);
    const [credit, setcredit] = useState(10);
    const [gwb, setgwb] = useState(10);
    const [seconds, setSeconds] = useState(0);
    const [atk, setatk] = useState(false);
    const [currentnpc, setcurrentnpc] = useState(0);
    // npc and resources 
    const [npc, setnpc] = useState([]);
    const [res, setRes] = useState([]);
    const [locationId, setLocation] = useState('1-1');
    const [inventory, setInventory] = useState([]); // used to hold the data for the inventory items collected 
    // fetch for database call for inventory items
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        const level = [
          { name: 'Attack', level: 1, experience: 0 },
          { name: 'Defence', level: 1, experience: 0 },
          { name: 'Woodcutting', level: 1, experience: 0 },
          { name: 'Mining', level: 1, experience: 0 },
          { name: 'Smithing', level: 1, experience: 0 },
          { name: 'Cooking', level: 1, experience: 0 },
          { name: 'Crafting', level: 1, experience: 0 },
          { name: 'Gathering', level: 1, experience: 0 }
        ];
      
        // console.log('Fetching user profile for userId:', userId);
      
        axios.get(`http://localhost:8000/api/user/profile/${userId}`)
          .then(response => {
            setUserProfile(response.data.user);
      
            // console.log('User profile fetched:', response.data.user);
      
            // Check if userProfile has levels, if not, update with default levels
            if (!response.data.user.level || response.data.user.level.length <= 0) {
            //   console.log('Updating levels for userId:', userId);
      
              axios.post(`http://localhost:8000/api/${userId}/update-levels`, { level }, {
                headers: {
                  'Content-Type': 'application/json',
                }
              })
              .then(updatedResponse => {
                // console.log('Levels updated:', updatedResponse.data);
      
                setUserProfile(prevProfile => ({
                  ...prevProfile,
                  levels: updatedResponse.data.levels
                }));
              })
              .catch(error => {
                console.error('Failed to update levels:', error);
              });
            }
          })
          .catch(error => {
            console.error('Failed to fetch user profile:', error);
          });
      }, [userId]);

useEffect(() => {
    // console.log('userprofile', userProfile);
},[userProfile]);

    
    //-----------pulling data from map to here for api data to show npc resources-----------
    const handleLocationChange = (newLocationId) => {
        setLocation(newLocationId);
        // console.log('location id:' ,newLocationId);
        // console.log('locationId variable:', locationId);
        // console.log(`res variable location: ${newLocationId}`, res);
        // console.log('fetching berry bush resouces', res[0].resources[0].loot) // accessing the loot of a resource
        
    }

    const fetchUserData = async () => {
        try {
            const resourceResponse = await axios.get(`http://localhost:7000/api/data/${locationId}`);
            setRes(resourceResponse.data);



            const updateLocation = async (location) => {
                try {
                    // console.log('triggered update Database')
                    const response = await fetch(`http://localhost:8000/api/${userId}/${locationId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({  location: location }),
                    });
                    if (!response.ok) {
                        throw new Error('Failed to update Location');
                        
                    }
                    // console.log('Location updated successfully');
                } catch (error) {
                    console.error('Error updating Location:', error);
                }
            };
            updateLocation(locationId)
            // if resourceResponse.data
            // console.log('resouceResponse.data',resourceResponse.data);
            // console.log('res',res)
            // console.log('resouceResponse api call',resourceResponse)
            // const npcResponse = await axios.get('http://localhost:5000/api/data/npc');
            // setnpc(npcResponse.data); console.log(npcResponse)
            
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

 
    
    //--------- attack function --------------------   
    const [isDisabled, setIsDisabled] = useState(false); // State to manage disabled state
    const [npcid, setnpcid]= useState(); // State to manage npcId

    const attack = (npcId, content) => {

        if (!content){

        // Find the NPC by id
        const npcIndex = res.findIndex((npc) => npc.id === npcId);
        setnpcid(npcId)
        if (npcIndex !== -1 && !isDisabled) {
            setIsDisabled(true)
            setTimeout(() =>{
                setIsDisabled(false)
            }, 2000)
            // Reduce health by the attack power (atk)
            const updatedHealth = res[npcIndex].health - rng(damage + 10, damage + 10 * 2);
            console.log('updated Health:', updatedHealth)
            console.log('damage', damage)
            // variable for attack power needs to be made 
    
            // If health is 0 or less, the NPC is dead
            if (updatedHealth <= 0) {
                // Log loot from the kill
                const resources = res[npcIndex].resources;
                const experience = res[npcIndex].resources[0].experience
                console.log(resources)
                console.log(experience)
    
                // Iterate over expereience
                
                experience.forEach(experience => {
                    const existingIndex = userProfile.level.findIndex(item => item.name === experience.name);
                    if (existingIndex !== -1 ) {
                        // Update existing level item
                        const updatedlevel = [...userProfile.level];
                        updatedlevel[existingIndex].experience += experience.experience;
                        setUserProfile(prevProfile => ({
                            ...prevProfile,
                            level: updatedlevel
                        }));
                        
                    } else {
                        // Add new resource to level
                        setUserProfile(prevProfile => ({
                            ...prevProfile,
                            level: [...prevProfile.level, { name: experience.name, experience: experience.experience }]
                        }));
                    }
                });
            
                // Iterate over resources
                resources.forEach(resource => {
                    const existingIndex = userProfile.inventory.findIndex(item => item.name === resource.name);
                    if (existingIndex !== -1 ) {
                        // Update existing inventory item
                        const updatedInventory = [...userProfile.inventory];
                        updatedInventory[existingIndex].loot += resource.loot;
                        setUserProfile(prevProfile => ({
                            ...prevProfile,
                            inventory: updatedInventory
                        }));
                        
                    } else {
                        // Add new resource to inventory
                        setUserProfile(prevProfile => ({
                            ...prevProfile,
                            inventory: [...prevProfile.inventory, { name: resource.name, loot: resource.loot }]
                        }));
                    }
                });
                // pushing the data to the database for the level changes experience and the level
                if (userProfile.level.length !== 0) {
                    const updateLevelDatabase = async (experience) => {
                        console.log('experience in leveldatabase',experience)
                        try {
                            console.log('triggered update level Database')
                            const response = await fetch(`http://localhost:8000/api/${userProfile.googleId}/update-levels`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({  level: experience }),
                            });
                            if (!response.ok) {
                                throw new Error('Failed to update levels');
                            }
                            console.log('levels updated successfully');
                        } catch (error) {
                            console.error('Error updating levels:', error);
                        }
                    };
                    const refresh = () => {
                        window.location.reload()
                    }
                
                    // Calling the function to update the database

                    updateLevelDatabase(userProfile.level);
                    // refresh();
                }
                // pushing the data to the database for the inventory
                if (userProfile.inventory.length !== 0) {
                    const updateDatabase = async (inventory) => {
                        try {
                            console.log('triggered update Database')
                            const response = await fetch(`http://localhost:8000/api/${userProfile.googleId}/update-inventory`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({  inventory: inventory }),
                            });
                            if (!response.ok) {
                                throw new Error('Failed to update inventory');
                            }
                            console.log('Inventory updated successfully');
                        } catch (error) {
                            console.error('Error updating inventory:', error);
                        }
                    };
                
                    // Calling the function to update the database
                    updateDatabase(userProfile.inventory);
                }
    
                // Remove the NPC from the array
                const updatedRes = [...res];
                updatedRes.splice(npcIndex, 1);
                setRes(updatedRes);
            } else {
                // Update NPC's health
                const updatedRes = [...res];
                updatedRes[npcIndex].health = updatedHealth;
                setRes(updatedRes);
                setTimeout(() => {
                    attack(npcId)
                }, 500);
            }
        }
    }else {
        setIsDisabled(true)
        console.log('disabled')
    }
    };


    // ------------ for testing state --------------------------------
    useEffect(() => {
        // console.log('Profile Inventory:', userProfile.inventory);
        // console.log('Profile level:', userProfile.level);
        // console.log('user Profile current:', userProfile);
        setUsername(userProfile.name)
        // console.log('user name', username)
        // console.log('user', user)
      }, [userProfile.inventory,userProfile.level]);
    
    
    const profileInventoryUpdate = (newinventory) =>{
            setUserProfile(old => ({
                ...old,
                inventory: newinventory
            }))
            console.log('profile inventory',userProfile.inventory)
    }


    // content update with open button on workshop or any future content to open up another interface


        
    // ------- timer code for attacking -------------------
const [damage, setdamage] = useState()
    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/profile/${userId}`)
            .then(response => {
                setUserProfile(response.data.user);
                setdamage(response.data.user.level[0].level)
                // setUsername(response.user.name);
                // console.log('user name:', username);
            })
            .catch(error => {
                console.error('failing to find user:', error);
            });
            // console.log('profile inventory', userProfile)
    }, [userId]);




    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {

        

            // Make a GET request to fetch user's profile by Google ID


        fetchUserData()
    
        let interval = null;
        if (atk) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (!atk && seconds !== 0) {
            clearInterval(interval);
        }
        
    
        if (!atk) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
            if (!atk && seconds === 0) {
                setSeconds(0);
                clearInterval(interval);
            }
        }
    
        return () => clearInterval(interval);
    }, [atk, seconds,data,locationId,inventory, location,]);
    
  

    return (
        <div  className='container'>
            <header>
            <GWheader/>
            </header>
            {/* <div>
                <GWNav />
            </div> */}
            <GameProvider>
            <div  className='gameplay'>
                {/* 3 column inventory game stats */}
                <div>
                    {/* inventory  */}{userProfile && userProfile.inventory && (
                <GWinventory inventory={userProfile.inventory} />
            )}
                </div>
                <div  className='gamecol'>
                    <div className='gamerow'>
                        <div className='map' >
                            {/* game map and timer */}
                            <GWmap onLocationChange={handleLocationChange}/>
                        </div>
                        <div id='player'  className='resources'> 
                            {/* resources/npcs  */}
                            <GWplayertag health='10' type='type: player' name={userProfile.name}/>
                        </div>
                        <div id='resources'  className='resources'> 
                            {/* resources/npcs  */}

                            {res.map((data) => (
                                
                                <NPC
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    type={data.type}
                                    health={data.health}
                                    content={data.content}
                                    onClickOpen = {handleOpen}
                                    data={data}
                                    addNPC={spawns}
                                    onClick={() => { attack(data.id,data.content) }} // Passes the id directly to the attack function
                                    atk={atk}
                                    seconds={seconds}
                                    isDisabled={isDisabled}
                                />

                            ))}
                            
                        </div>
                    </div>
                </div>    
            </div>
            </GameProvider>
            {/* <Timer/> */}
        </div>
    )
}
 
export default Home;

const styles = {
    container: {
        display: 'flex',
        flexDirection:'column',
        backgroundColor: 'black',
        height:'100vh'
    },
    gameplay: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        backgroundColor: 'black',
        marginTop: '5px',
        height:'600px',
    },
    row: {
        display: 'flex',
      flexDirection:'row'  
    },
    map: {
        boxShadow: '1px 3px 3px 5px rgb(255,192,203), 1px 3px 3px 5px rgba(0, 0, 0, 0.19)',
        height: '280px',
        marginTop:'20px',
        marginRight: '20px',
    },
    resources: {
        marginTop: '12px',
        marginRight: '20px',
        width: '110px'
    },
    gamecol: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '20px',
    },
    gamerow: {
        display: 'flex',
        flexDirection:'row'
    },
    resourcesheld: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center'
        // height:'30px',
    },
    test: {
        color: "aqua"
    },
}
