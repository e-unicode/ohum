import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, InputGroup, FormControl, Button, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";

function SearchPage(props) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="post">
      <div className="post-top">
        <div className="search-form">
          <div className="form" style={{ width: "100%" }}>
            <input
              className="search-input"
              type="input"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  console.log("pressed");
                }
              }}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="노래 제목, 가수 이름, 관련 키워드를 입력하세요."
              required=""
            />
            <button
              onClick={() => {
                console.log("clicked");
              }}
              className="search-enter"
            >
              찾기
            </button>
          </div>
        </div>
      </div>

      <div className="post-content pt-5">
        <div className="content-side">
          <div className="side-btn">메인피드페이지</div>
          <div className="side-btn">나랑 같은 날씨</div>
          <div className="side-btn">나랑 같은 위치</div>
          <div className="side-btn">내 페이지</div>
        </div>
        <div className="content-main">
          <Container>
            <Row className="mx-2 row row-cols-4">
              {props.albums.map((album, i) => {
                return (
                  <Card>
                    <Card.Img src={album.images[0].url} />
                    <Card.Body>
                      <Card.Title>{album.name}</Card.Title>
                    </Card.Body>
                  </Card>
                );
              })}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
