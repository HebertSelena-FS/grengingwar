import React, { useEffect, useState } from 'react';
import "./ticks.css"

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [atk, setAtk] = useState(false);

  const toggleAttack = () => {
    console.log('Toggle attack');
    setAtk(!atk);
    setSeconds(3); // Reset seconds when starting attack
  };

  const stopAttack = () => {
    console.log('Stop attack');
    setAtk(false);
  };

  useEffect(() => {
    console.log('Use effect triggered', atk, seconds);
    let interval = null;

    if (atk && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!atk && seconds !== 0) {
      clearInterval(interval);
    } else if (atk && seconds === 0) {
      setSeconds(3);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [atk, seconds]);

  // ============================================================================
  //                          testing level experience
  // ============================================================================


  function experienceForLevel(level) {
    return (level * (level + 1) / 2) * 1000;
}

// Example usage:
let level = 5;
let experience = experienceForLevel(level);
console.log(`The experience required for level ${level} is: ${experience}`);

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

// Example usage:
let totalExperience = 1500;
let result = getLevelAndRemainingExperience(totalExperience);
console.log(`The level for ${totalExperience} experience points is: ${result.level}`);
console.log(`Experience needed to reach the next level: ${result.remainingExperience}`);




  return (
    <div className="app">
      <div className="time">
        {atk ? `Attacking in ${seconds}s` : 'Ready to Attack'}
      </div>
      <div className="row">
        <button onClick={atk ? stopAttack : toggleAttack}>
          {atk ? 'Stop Attack' : 'Attack'}
        </button>
      </div>
    </div>
  );
};

export default Timer;
