import "./Post.css";
import Search from "./Search";
import { Container, Row } from "react-bootstrap";

function Post() {
  return (
    <div className="post">
      <div className="post-search">
        <div className="search2">
          <form action="/" method="POST">
            <input className="search-input" type="text" name="search" placeholder="SEARCH" />
            <button type="submit">🔎</button>
          </form>
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
            <Row>
              <div className="card2">
                <div className="card_load">앨범이미지</div>
                <div className="card_load_extreme_title">title</div>
                <div className="card_load_extreme_descripion">dasdf</div>
              </div>
            </Row>
            <Row>
              <div className="card2">
                <div className="card_load">앨범이미지</div>
                <div className="card_load_extreme_title">title</div>
                <div className="card_load_extreme_descripion">dasdf</div>
              </div>
            </Row>
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
    </div>
  );
}

export default Post;
