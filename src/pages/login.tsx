import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };

  return (
    <div>
      <h1>Logowanie</h1>
      <button onClick={handleLogin}>Zaloguj</button>
    </div>
  );
}
