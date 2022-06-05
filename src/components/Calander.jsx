import { Calendar } from "antd";
import React, { useEffect, useState } from "react";

const CalendarComponent = () => {
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const style = {
    border: "1px solid #d9d9d9",
    borderRadius: 4,
    background: "red",
  };

  console.log(isMobile, window.innerWidth);

  function refreshTime() {
    const timeDisplay = document.getElementById("time");
    const dateString = new Date().toLocaleString();
    const formattedString = dateString.replace(", ", " - ");
    timeDisplay.textContent = formattedString;
  }
    setInterval(refreshTime, 1000);
  return (
    <div style={isMobile ? style :{}}>
        <div id="time" className="container"></div>
      <Calendar fullscreen={!isMobile} className="container"></Calendar>
    </div>
  );
};

export default CalendarComponent;
