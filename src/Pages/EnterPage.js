import "./Join.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function EnterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  function submitForm(event) {
    event.preventDefault();

    if (!regexEmail.test(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    } else if (!regexPassword.test(password)) {
      alert("비밀번호는 8글자 이상이며, 영문 대소문자와 숫자가 모두 포함되어야 합니다.");
      return;
    }

    window.location.href = "/";
  }

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
            <form action="/" method="POST" onSubmit={submitForm}>
              <div className="form">
                <input
                  className="input"
                  placeholder="이메일 아이디"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="input-border"></span>
              </div>
              <div className="form">
                <input
                  className="input"
                  placeholder="비밀번호"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="input-border"></span>
              </div>
              <div>
                <button className="enter" type="submit">
                  로그인
                </button>
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
