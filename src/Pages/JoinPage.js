import "./Join.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

function JoinPage(props) {
  return (
    <div className="join">
      <div className="join-box">
        <div className="join-box-content">
          <h1>가입하기</h1>
          <p>우리의 취향을 공유해 봐요.</p>
          <div className="form form-w">
            <input className="input" placeholder="사용자 이름" required="" type="input" />
            <span className="input-border"></span>
          </div>
          <div className="form form-w">
            <input className="input" placeholder="이메일 아이디" required="" type="input" />
            <span className="input-border"></span>
          </div>
          <div className="form form-w">
            <input className="input" placeholder="비밀번호" required="" type="input" />
            <span className="input-border"></span>
          </div>
          <div>
            <Link to="/">
              <button className="enter">가입</button>
            </Link>
            <Link to="/">
              <button className="enter enter-ml">둘러보기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinPage;
