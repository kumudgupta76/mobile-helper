import { Calendar, Col, Row, Select, Radio, Typography, Progress } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { green, red } from '@ant-design/colors'

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const Cal = () => {
  const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7'
  }

  const [value, setValue] = useState(() => 20)

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Call your method here
      myMethod()
    }, 1000) // Interval of 1000 milliseconds (1 seconds)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, []) // Empty dependency array to run this effect only once when the component mounts

  // Method to be called at the interval
  const myMethod = () => {
    console.log('Method called every 5 seconds')
    // Add your method logic here

    if ('getBattery' in navigator) {
      navigator.getBattery().then(function (battery) {
        // Update battery status initially
        updateBatteryStatus(battery)

        // Update battery status whenever it changes
        battery.addEventListener('chargingchange', function () {
          updateBatteryStatus(battery)
        })

        battery.addEventListener('levelchange', function () {
          updateBatteryStatus(battery)
        })
      })

      function updateBatteryStatus (battery) {
        var percentage = Math.round(battery.level * 100)
        setValue(percentage)
        document.getElementById('battery-fill').style.width = percentage + '%'
        document.getElementById('battery-percentage').innerText =
          percentage + '%'
      }
    } else {
      document.getElementById('battery-status').innerText =
        'Battery Status API not supported'
    }
  }

  return (
    <div className='outer-container'>
      <div id='battery-status'></div>
      {/* <div className="battery-container">
            <div className="battery-level">
                <div id="battery-fill" className="battery-fill" style={{width: "50%"}}></div>
            </div>
            <span id="battery-percentage">50%</span>
  </div> */}
      <Progress type='dashboard' percent={value} strokeColor={conicColors} />
    </div>
  )
}
export default Cal
