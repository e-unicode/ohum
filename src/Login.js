import "./Login.css";
import { useEffect, useState } from "react";

function Login() {
  return (
    <div>
      <div className="form">
        <input className="input" placeholder="ID" required="" type="input" />
        <span className="input-border"></span>
      </div>
      <div className="form">
        <input className="input" placeholder="PASSWORD" required="" type="input" />
        <span className="input-border"></span>
      </div>
      <div>
        <button className="enter">Login</button>
        <button className="enter" style={{ marginLeft: "5px" }}>Join</button>
      </div>
    </div>
  );
}

export default Login;
