import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [User, setUser] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');

    axios.get(`http://localhost:8000/api/user/profile/${userId}`)
        .then(response => {
          const userData = response.data.user.googleId
            setUserId(response.data.user.googleId);
            setUser(response.data.user)
            // console.log(response.data.user.googleId);
            // setUserId(userData.googleId);
            // setUsername(response.user.name);
            // console.log('user name:', username);
        })
        .catch(error => {
            console.error('failing to find user:', error);
        });
        // console.log('profile data', user)
}, []);

    useEffect(() => {
        // console.log('User',User)
        // console.log('userId', userId)
        // console.log('user profile', userProfile)
      }, [User, userId]);

  return (
    <UserContext.Provider value={{ userId, User, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
