import "../App.css";

function PostBox(props) {

  return (
    <div className="post-box">
      <div className="post-box-user">
        <img src="oh-um-logo.jpg" />
        <div className="post-box-user-name">
          <h6>user name</h6>
          <p>지금 날씨: {props.weather}</p>
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
