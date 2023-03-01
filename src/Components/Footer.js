import "../App.css";

function Footer(props) {
  return (
    <div className="footer">
      <div className="footer-content">
        <p>지금 음악 {props.mood}</p>
        <p>가입하기</p>
        <p>로그인</p>
        <p>한국어</p>
        <p>English(US)</p>
        <p>e-unicode @ 2023</p>
      </div>
    </div>
  );
}

export default Footer;