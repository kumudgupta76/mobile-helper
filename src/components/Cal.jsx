import { Calendar, Col, Row, Select, Radio, Typography } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];


const Cal = () => {

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  const [value, setValue] = useState(() => dayjs('2017-01-25'));
    const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };
  const onPanelChange2 = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="outer-container">
    <Row>
      <Col style={{ width: "100%" }}>
        <div id="time-now-3" className="container"></div>
      </Col>
      <Col>
        <Row>
          <Col span={12} sm={12} xs={24}>
          <Typography.Title level={4} className="container">{`Current Month - ${month[new Date().getMonth()]}`}</Typography.Title>
          <div className="container">
            <Calendar onPanelChange={onPanelChange} fullscreen={false}/>
          </div>
          </Col>
          <Col span={12} sm={12} xs={24}>
          <Typography.Title level={4} className="container">{`Current Month - ${month[new Date().getMonth()+1]}`}</Typography.Title>
          <div className="container">
                <Calendar onPanelChange={onPanelChange2} fullscreen={false} defaultValue={dayjs('2017-01-25')}/>
        </div>
          </Col>
        </Row>
      </Col>
    </Row>
    </div>
  );
};

export default Cal;
