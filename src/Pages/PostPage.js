import "../App.css";
import { Container, Row } from "react-bootstrap";

function Post(props) {
  return (
    <div className="post">
      <div className="post-search">
        <div className="post-search-input">
          <div style={{width: '100%'}} className="form mt-0">
            <input className="input" placeholder="검색어를 입력하세요." required="" type="text" />
            <span className="input-border"></span>
            <button onClick={() => {
                console.log("clicked");
              }} className="enter">
                가입
              </button>
          </div>
        </div>
      </div>
      <div className="post-content">
        <div className="content-side">
          <div className="side-btn">메인피드페이지</div>
          <div className="side-btn">나랑 같은 날씨</div>
          <div className="side-btn">나랑 같은 위치</div>
          <div className="side-btn">내 페이지</div>
        </div>
        <div className="content-main">
          <Container>
            <Row>
              <div className="card2">
                <div className="card_load">앨범이미지</div>
                <div className="card_load_extreme_title">title</div>
                <div className="card_load_extreme_descripion">dasdf</div>
              </div>
            </Row>

          </Container>
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

export default Post;
