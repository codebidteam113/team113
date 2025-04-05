
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const Index = () => {
  const navigate = useNavigate();

  // This component simply renders the Home component
  // It's kept for compatibility with the original structure
  return <Home />;
};

export default Index;
