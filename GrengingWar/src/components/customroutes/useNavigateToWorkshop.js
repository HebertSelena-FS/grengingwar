// src/hooks/useNavigateToWorkshop.js
import { useNavigate } from 'react-router-dom';

const useNavigateToWorkshop = () => {
  const navigate = useNavigate();

  const navigateToWorkshop = () => {
    navigate('/workshop');
  };

  return navigateToWorkshop;
};

export default useNavigateToWorkshop;
