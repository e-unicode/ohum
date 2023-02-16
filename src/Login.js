import "./Search.css";
import { useEffect, useState } from "react";

function Login() {
  return (
    <div className="search">
      <div className="form">
        <input className="input" placeholder="ID" required="" type="input" />
        <span className="input-border"></span>
      </div>
      <div className="form">
        <input className="input" placeholder="PASSWORD" required="" type="input" />
        <span className="input-border"></span>
      </div>
      <div>
        <button className="enter">Sign in</button>
        <button className="enter" style={{ marginLeft: "2%" }}>Join</button>
      </div>
    </div>
  );
}

export default Login;
