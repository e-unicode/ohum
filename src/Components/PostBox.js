import "../App.css";

function PostBox() {
  return (
    <div className="post-box">
      <div className="post-box-user">
        <img src="oh-um-logo.jpg" />
        <div className="post-box-user-name">
          <h6>e-unicode</h6>
          <p>지금 닐씨: 맑음</p>
        </div>
        <div className="post-box-like">
          <p>like</p>
        </div>
      </div>
      <div className="post-box-card">
        <div className="post-box-card-title">
          <p>Title</p>
          <p style={{ fontSize: "30px", fontWeight: "100" }}>Artist</p>
        </div>
      </div>
    </div>
  );
}

export default PostBox;
