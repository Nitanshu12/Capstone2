import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container">
      <div className="form-toggle">
        <button onClick={() => setIsLogin(true)} className={isLogin ? "active" : ""}>Login</button>
        <button onClick={() => setIsLogin(false)} className={!isLogin ? "active" : ""}>Signup</button>
      </div>
      {isLogin ? <Login /> : <Signup />}
    </div>
  );
}

export default App;
