
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import axios from 'axios';
import "./landing.css"
// 2. Update the breakpoints as key-value pairs
const breakpoints = {
  sm: '400px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}




function Landing() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);
    const [user, setUser] = useState(currentUser);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    
//     useEffect(() => {
//     console.log("Sidebar isOpen state updated:", isOpen);
//   }, [isOpen]);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setCurrentUser(null);
        navigate('/');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const handleSignIn = () => {
    console.log("Google sign-in button clicked");
    window.location.href = "http://localhost:8000/auth/google";
  }; 

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://server:8000';
        const response = await axios.get(`${backendUrl}/api/auth/status`);
        if (response.data.isAuthenticated) {
          setIsLoggedIn(true);
          setUser(response.data.user);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching auth status:", error);
        setIsLoggedIn(false);
      }
    };
    fetchAuthStatus();
  }, []);

    return (
        <div style={styles.body}  >
            <div className="container-landing">
                <div>    
                    Grenging War
                </div>
                {/* <Link to="/home"  >         */}
                    <button className="button" onClick={handleSignIn}>
                        Play
                    </button>
                {/* </Link>   */}
            </div>
        </div>
        
    )
}

export default Landing

const styles = {
    body: {
        backgroundColor: 'green'
    },
    main: {
        // display: 'flex',
        // flexDirection: 'row',
        // width:'150px'
        // width: '90%',
        // margin:'5px'
    }
}