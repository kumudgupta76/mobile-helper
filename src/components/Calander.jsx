import { Calendar, Col, Row, Select, Radio, Typography } from "antd";
import { DatePicker, Space } from 'antd';
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const HeaderComponent = ({ value, type, onChange, onTypeChange }) => {
  const start = 0;
  const end = 12;
  const monthOptions = [];
  const current = value.clone();
  const localeData = value.localeData();
  const months = [];

  for (let i = 0; i < 12; i++) {
    current.month(i);
    months.push(localeData.monthsShort(current));
  }

  for (let index = start; index < end; index++) {
    monthOptions.push(
      <Select.Option className="month-item" key={`${index}`}>
        {months[index]}
      </Select.Option>
    );
  }

  const month = value.month();
  const year = value.year();
  const options = [];

  for (let i = year - 10; i < year + 10; i += 1) {
    options.push(
      <Select.Option key={i} value={i} className="year-item">
        {i}
      </Select.Option>
    );
  }
  console.log(
    month,
    year,
    current.toDate(),
    current.toLocaleString()
  );
  return (
    <div
      style={{
        padding: 8,
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <Typography.Title level={4}>{`Selected Date - ${
        current.date() + "-" + (month + 1) + "-" + year
      }`}</Typography.Title>{" "}
      <Row gutter={8}>
        <Col>
          <Radio.Group
            size="large"
            onChange={(e) => onTypeChange(e.target.value)}
            value={type}
          >
            <Radio.Button value="month">Month</Radio.Button>
            <Radio.Button value="year">Year</Radio.Button>
          </Radio.Group>
        </Col>
        <Col>
          <Select
            size="large"
            dropdownMatchSelectWidth={false}
            className="my-year-select"
            onChange={(newYear) => {
              const now = value.clone().year(Number(newYear));
              onChange(now);
            }}
            value={String(year)}
          >
            {options}
          </Select>
        </Col>
        <Col>
          <Select
            size="large"
            dropdownMatchSelectWidth={false}
            value={String(month)}
            onChange={(selectedMonth) => {
              console.log(selectedMonth);
              const newValue = value.clone();
              newValue.month(parseInt(selectedMonth, 10));
              console.log(selectedMonth, newValue.toLocaleString());
              onChange(newValue);
            }}
          >
            {monthOptions}
          </Select>
        </Col>
      </Row>
    </div>
  );
};

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
    timeDisplay.textContent = "Today : " + formattedString;
  }
  setInterval(refreshTime, 1000);

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  const [value, setValue] = useState(() => dayjs());

  const onPanelChange2 = (newValue) => {
    setValue(newValue);
  };
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    if(date)
    setValue(date);
  };
  return (
    <div className="outer-container">
    <Row>
      <Col style={{ width: "100%" }}>
      <Typography.Title level={2} className="container">{`${value}`}</Typography.Title>
        <DatePicker onChange={onChangeDate} />
      </Col>
      <Col>
        <Row>
          <Col span={12} xl={12} md={24} sm={24} xs={24}>
          <Typography.Title level={3} className="container">{`Current - ${month[value.month()]}`}</Typography.Title>
          <div className="container">
          <Calendar
            fullscreen={false}
            headerRender={() => <div style={{}}></div>}
            dateFullCellRender={(date) => {
              return <div className="date-cell">{date.date()}</div>;
            }}
            onPanelChange={onPanelChange}
          />
        </div>
          </Col>
          <Col span={12} xl={12} md={24} sm={24} xs={24}>
          <Typography.Title level={3} className="container">{`Next - ${month[value.month()+1]}`}</Typography.Title>
          <div className="container">
          <Calendar
            fullscreen={false}
            value={value.add(1, "M")}
            headerRender={() => <div style={{}}></div>}
            dateFullCellRender={(date) => {
              return <div className="date-cell-next">{date.date()}</div>;
            }}
            onPanelChange={onPanelChange}
          />
        </div>
          </Col>
        </Row>
      </Col>
    </Row>
    </div>
  );
};

export default CalendarComponent;
