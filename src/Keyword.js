import "./Keyword.css";
import { useEffect, useState } from "react";
import Search from "./Search";

function Keyword(props) {
  const [now, setNow] = useState("");
  const [nowTag, setNowTag] = useState(false);

  useEffect(() => {
    (function printNow() {
      const today = new Date();

      const dayNames = ["(Sun)", "(Mon)", "(Tue)", "(Wed)", "(Thu)", "(Fri)", "(Sat)"];

      const day = dayNames[today.getDay()];

      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const date = today.getDate();
      let hour = today.getHours();
      let minute = today.getMinutes();
      let second = today.getSeconds();
      const ampm = hour >= 12 ? "PM" : "AM";

      hour %= 12;
      hour = hour || 12;

      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;

      const now = `${month}. ${date}.${day} ${ampm} ${hour}:${minute}`;
      setTimeout(printNow, 1000);
      setNow(now);
      setNowTag(true);
    })();
  }, [now]);

  return (
    <div className="keyword">
      <div>
        {nowTag === true ? <p>{now}</p> : null}
        <p>{props.mood}</p>
        <p>
          {props.weather}, {props.temperature}℃
        </p>
        <Search />
      </div>
    </div>
  );
}

export default Keyword;
