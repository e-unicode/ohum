import "../App.css";
import Banner from "../Components/Banner";
import PostBox from "../Components/PostBox";

function PostPage() {
  return (
    <>
      <div className="post-top">
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
    </>
  );
}

export default PostPage;