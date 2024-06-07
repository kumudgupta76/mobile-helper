import { Calendar, Col, Row, Select, Radio, Typography, Progress, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { green, red } from '@ant-design/colors'
import { LoadingOutlined } from '@ant-design/icons';
const { Text, Link, Title } = Typography;

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
    '0%': '#ffccc7',
    '50%': '#ffe58f',
    '100%': '#87d068'
  }

  const [value, setValue] = useState(() => 0)
  const [batterySupported, setBatterySupported] = useState(() => true)

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

      function updateBatteryStatus(battery) {
        var percentage = Math.round(battery.level * 100)
        setValue(percentage)
      }
    } else {
      setBatterySupported(false)
    }
  }

  return (

    <div className='outer-container'>
      {
        batterySupported ?
          value === 0 ? <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 100,
                }}
                spin
              />
            }
          /> : <Row>
            <Col span={24} style={{ textAlign: 'center', justifyContent: "center" }}>
              <Title level={4}> Battery Status</Title>
            </Col>
            <Col span={24} style={{ textAlign: 'center', marginTop: '30px' }}>
              <Progress type='dashboard' percent={value} strokeColor={conicColors} size='large' />
            </Col>
            <Col span={24} style={{ textAlign: 'center', marginTop: '30px' }}>
              <Progress steps={5} percent={value} strokeWidth={30} />
            </Col>
          </Row>
          : <Title level={3}> Battery Status API not supported</Title>
      }
    </div>
  )
}
export default Cal
