import React, { useEffect, useContext, useState } from "react";
// import GWinventoryslot from "../inventory/GWinventoryslot";
import './gwlevels.css'
import axios from 'axios';
import UserContext from '../../UserContext';


// Dummy Component
const GWlevels = props => {
    const { userId } = useContext(UserContext);
    const [userProfile, setUserProfile] = useState([]);
    const [attack, setattack] = useState([]);
    const [defence, setdefence] = useState([]);
    const [woodcutting, setwoodcutting] = useState([]);
    const [mining, setmining] = useState([]);
    const [smithing, setsmithing] = useState([]);
    const [cooking, setcooking] = useState([]);
    const [crafting, setcrafting] = useState([]);
    const [gathering, setgathering] = useState([]);

    function getLevelAndRemainingExperience(totalExperience) {
        let level = 0;
        let experienceNeeded = 1000;
        let accumulatedExp = 0;
      
        while (totalExperience >= accumulatedExp + experienceNeeded) {
            accumulatedExp += experienceNeeded;
            level++;
            experienceNeeded = (level + 1) * 1000;
        }
      
        let remainingExperience = (accumulatedExp + experienceNeeded) - totalExperience;
      
        return {
            level: level,
            remainingExperience: remainingExperience
        };
      }

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

    

      
// Example usage:
// let totalExperience = 1500;
// let result = getLevelAndRemainingExperience(totalExperience);
// console.log(`The level for ${totalExperience} experience points is: ${result.level}`);
// console.log(`Experience needed to reach the next level: ${result.remainingExperience}`);
const atklevel = getLevelAndRemainingExperience(attack.experience)
const deflevel = getLevelAndRemainingExperience(defence.experience)
// console.log('attack level ', atklevel.level)
// console.log('attack experience ', atklevel.remainingExperience)


const test = 




    useEffect(() => {
// console.log('attack',attack)
// if (attack.expereience < userProfile.attack.expereience) {
//  console.log('attack level', attack.level)
//  console.log('atklevel', atklevel.level)
// }
    
        axios.get(`http://localhost:8000/api/user/profile/${userId}`)
            .then(response => {
                setUserProfile(response.data.user);
                setattack(response.data.user.level[0])
                setdefence(response.data.user.level[1])
                setwoodcutting(response.data.user.level[2])
                setmining(response.data.user.level[3])
                setsmithing(response.data.user.level[4])
                setcooking(response.data.user.level[5])
                setcrafting(response.data.user.level[6])
                setgathering(response.data.user.level[7])
            })
            .catch(error => {
                console.error('failing to find user:', error);
            });
            // console.log('profile inventory', userProfile)
    }, [userId, userProfile]);


    return (
        <div className="level-scroll">
            <div className="level-column">
                <div className="level-inventory" >
                    <div className="level-items">
                        <div className="level-stat-container">
                            <div className="level-title">Attack</div>
                            <div>Level:{atklevel.level}</div>
                            <div>NTL:{atklevel.remainingExperience} </div>
                            {/* <div>XP:{attack.experience}</div> */}
                        </div>
                    </div>
                </div>
                <div className="level-inventory" >
                    <div className="level-items">
                        <div className="level-stat-container">
                            <div className="level-title">Cooking</div>
                            <div>Level:{cooking.level}</div>
                            <div>XP:{cooking.experience}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="level-column">
                <div className="level-inventory" >
                    <div className="level-items">
                        <div className="level-stat-container">
                            <div className="level-title">Defence</div>
                            <div>Level:{defence.level}</div>
                            {/* <div>Level:{deflevel.level}</div> */}
                            {/* <div>XP:{attack.experience}</div> */}
                            <div>NTL:{deflevel.remainingExperience}</div>
                        </div>
                    </div>
                </div>
                <div className="level-inventory" >
                    <div className="level-items">
                        <div className="level-stat-container">
                            <div className="level-title">Crafting</div>
                            <div>Level:{crafting.level}</div>
                            <div>XP:{crafting.experience}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="level-column">
                <div className="level-inventory" >
                    <div className="level-items">
                        <div className="level-stat-container">
                            <div className="level-title">Woodcutting</div>
                            <div>Level:{woodcutting.level}</div>
                            <div>XP:{woodcutting.experience}</div>
                        </div>
                    </div>
                </div>
                <div className="level-inventory" >
                    <div className="level-items">
                        <div className="level-stat-container">
                            <div className="level-title">Gathering</div>
                            <div>Level:{gathering.level}</div>
                            <div>XP:{gathering.experience}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="level-column">
                <div className="level-inventory" >
                    <div className="level-items">
                        <div className="level-stat-container">
                            <div className="level-title">Mining</div>
                            <div>Level:{mining.level}</div>
                            <div>XP:{mining.experience}</div>
                        </div>
                    </div>
                </div>
                {/* <div className="level-inventory" >
                    <div className="level-items">
                        <div className="level-stat-container">
                            <div className="level-title">Attack</div>
                            <div>Level:99990</div>
                            <div>XP:9,999,990</div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="level-column">
                <div className="level-inventory" >
                    <div className="level-items">
                        <div className="level-stat-container">
                            <div className="level-title">Smithing</div>
                            <div>Level:{smithing.level}</div>
                            <div>XP:{smithing.experience}</div>
                        </div>
                    </div>
                </div>
                {/* <div className="level-inventory" >
                    <div className="level-items">
                        <div className="level-stat-container">
                            <div className="level-title">Attack</div>
                            <div>Level:99990</div>
                            <div>XP:9,999,990</div>
                        </div>
                    </div>
                </div> */}
            </div>
                
        </div>
    );
}
export default GWlevels;

