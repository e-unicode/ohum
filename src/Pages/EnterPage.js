import "./Join.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function EnterPage(props) {

  return (
    <div className="join">
      <div className="join-box">
          <div className="join-box-content">
            <h1>오늘 음악 맑음</h1>
            <h6>
              지금 어디서, 어떤 날씨에서, 어떤 플레이리스트를 재생하고 있는지 공유해 주세요. 갑자기 뜨거운 태양 아래이고 싶거나, 적당히 어두운 구름
              아래서 내리는 비를 맞고 싶은 사람이 필요로 할 거예요.
            </h6>
            <div>
              <form action="/" method="POST">
                <div className="form">
                  <input className="input" placeholder="이메일" name="id" type="email" />
                  <span className="input-border"></span>
                </div>
                <div className="form">
                  <input className="input" placeholder="비밀번호" name="pw" type="password" />
                  <span className="input-border"></span>
                </div>
                <div>
                  <Link to="/">
                    <button className="enter">로그인</button>
                  </Link>
                  <Link to="/join">
                    <button className="enter enter-ml">가입하기</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
      </div>
    </div>
  );
}

export default EnterPage;