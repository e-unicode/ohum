import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function JoinPage(props) {
  return (
    <div className="join-bg">
      <div className="join-box">
        <div className="join-box-content">
          <h1>가입하기</h1>
          <p>우리의 취향을 공유해 봐요.</p>
          <div style={{ width: "100%" }} className="form">
            <input className="input" placeholder="사용자 이름" required="" type="input" />
            <span className="input-border"></span>
          </div>
          <div style={{ width: "100%" }} className="form">
            <input className="input" placeholder="이메일 아이디" required="" type="input" />
            <span className="input-border"></span>
          </div>
          <div style={{ width: "100%" }} className="form">
            <input className="input" placeholder="비밀번호" required="" type="input" />
            <span className="input-border"></span>
          </div>
          <div>
            <Link to="/post">
              <button style={{ width: "49%", marginTop: "30px" }} className="enter">
                가입
              </button>
            </Link>
            <Link to="/">
              <button style={{ width: "49%", margin: "30px 0 0 2%" }} className="enter">
                나중에 가입하기
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div style={{position: "fixed", bottom: "0"}} className="main-footer">
        <div className="main-footer-content">
          <p>지금 음악: {props.mood}</p>
          <p>가입하기</p>
          <p>로그인</p>
          <p>한국어</p>
          <p>English(US)</p>
          <p>e-unicode @ 2023</p>
          {/* <p>{nowTag === true ? <p>{now}</p> : null}</p> */}
        </div>
      </div>
    </div>
  );
}

export default JoinPage;
