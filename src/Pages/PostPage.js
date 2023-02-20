import "../App.css";
import Search from "../Components/Search";
import Banner from "../Components/Banner";
import PostBox from "../Components/PostBox";

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
          <div className="post-content-post-box">
            <PostBox />
            <PostBox />
            <PostBox />
            <PostBox />
            <PostBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;