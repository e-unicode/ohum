import "../App.css";
import { Container, Row } from "react-bootstrap";
import Footer from "../Components/Footer";
import Search from "../Components/Search";
import Banner from "../Components/Banner";

function PostPage(props) {
  return (
    <div className="post">
      <div className="post-top">
        <Search />
      </div>
      <div className="post-content">
        <div className="post-content-side">
          <Banner />
        </div>
        <div className="post-content-main">
        </div>
      </div>
      <div className="post-bottom">
        <Footer mood={props.mood} />
      </div>
    </div>
  );
}

export default PostPage;
