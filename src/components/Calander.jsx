import { Calendar, Col, Row, Select, Radio, Typography } from "antd";
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
    const timeDisplay = document.getElementById("time-now");
    const dateString = new Date().toLocaleString();
    const formattedString = dateString.replace(", ", " - ");
    timeDisplay.textContent = formattedString;
  }
  setInterval(refreshTime, 1000);

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  return (
    <Row>
      <Col style={{ width: "100%" }}>
        <div id="time-now" className="container"></div>
      </Col>
      <Col>
        <Calendar fullscreen={isMobile} className="container"></Calendar>
      </Col>
    </Row>
  );
};

export default CalendarComponent;
