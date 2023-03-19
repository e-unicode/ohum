import "./Loading.css";

function Loading() {
  return (
    <div className="loader-bg">
      <div className="loader">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </div>
  );
}

export default Loading;