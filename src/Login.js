import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


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
        <Link to="/post"><button className="enter">Login</button></Link>
        <button className="enter" style={{ marginLeft: "10px" }}>Join</button>
      </div>
    </div>
  );
}

export default Login;