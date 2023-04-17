import "../css/JoinPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function JoinPage() {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const regexName = /^[a-zA-Z0-9]{4,}$/;
  const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  function submitForm(event) {
    event.preventDefault();

    if (!regexName.test(name)) {
      alert("사용자 이름은 4글자 이상이며, 영문 대소문자와 숫자로만 이루어져야 합니다.");
      return;
    } else if (!regexEmail.test(email)) {
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
          <h1>가입하기</h1>

          <form onSubmit={submitForm}>
            <div className="form form-w">
              <input className="input" placeholder="사용자 이름" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
              <span className="input-border"></span>
            </div>
            <div className="form form-w">
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
            <div className="form form-w">
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
            <h6>- 사용자 이름은 4글자 이상이며, 영문 대/소문자/숫자로만 이루어져야 합니다.</h6>
            <h6>- 비밀번호는 8글자 이상이며, 영문 대/소문자/숫자가 포함되어야 합니다.</h6>

            <div>
              <button
                className="enter"
                type="submit"
                onClick={() => {
                  navigate("/login");
                }}
              >
                가입
              </button>
                <button className="enter enter-ml"onClick={() => {
                  navigate("/");
                }}>둘러보기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JoinPage;
