import { Calendar, Col, Row, Select, Radio, Typography } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];


const Cal = () => {

  if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {
        // Update battery status initially
        updateBatteryStatus(battery);

        // Update battery status whenever it changes
        battery.addEventListener('chargingchange', function() {
            updateBatteryStatus(battery);
        });

        battery.addEventListener('levelchange', function() {
            updateBatteryStatus(battery);
        });
    });

    function updateBatteryStatus(battery) {
        var percentage = Math.round(battery.level * 100);
        document.getElementById('battery-fill').style.width = percentage + '%';
        document.getElementById('battery-percentage').innerText = percentage + '%';
    }
} else {
    document.getElementById('battery-status').innerText = "Battery Status API not supported";
}
  return (
    <div className="outer-container">
   <div id="battery-status"></div>
   <div className="battery-container">
            <div className="battery-level">
                <div id="battery-fill" className="battery-fill" style={{width: "50%"}}></div>
            </div>
            <span id="battery-percentage">50%</span>
        </div>
    </div>
  );
};
export default Cal;
