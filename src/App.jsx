import { useEffect, useRef, useState } from 'react';
import './App.css';

import styled from 'styled-components';

const messagesArr = [
  {
    sender: 'left',
    text: 'hi!',
  },
  {
    sender: 'right',
    text: 'sup?',
  },
  {
    sender: 'left',
    text: 'good, man! whatcha doing tonight? wanna come with us to the game? ',
  },
  {
    sender: 'right',
    text: 'Sorry',
  },
  {
    sender: 'right',
    text: 'Need to go do the shopping today, there is nothing to eat at the fridge...',
  },
  {
    sender: 'left',
    text: 'Okay, no problem',
  },
  {
    sender: 'left',
    text: 'maybe after that you can ping us and you can join later?',
  },
  {
    sender: 'right',
    text: 'okay, sounds good',
  },
  {
    sender: 'right',
    text: 'alright, see you guyz ',
  },
  {
    sender: 'left',
    text: 'cool, see you then!',
  },
];

function App() {
  const [messages, setMessages] = useState(messagesArr);
  let tiltRef = useRef();

  useEffect(() => {
    requestDeviceOrientation();
  }, []);

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    console.warn(e);
    const newMessages = [
      ...messages,
      {
        sender: 'right',
        text: inputValue,
      },
    ];
    setMessages(newMessages);
    setInputValue('');
  };

  function handleOrientation(event) {
    const { alpha, beta, gamma } = event;
    // const betaCorrected = beta - 90;
    // setAlpha(alpha);
    console.log(Math.sin(gamma), Math.sin(beta), Math.sin(alpha));
    // setGamma(gamma);
    console.log(tiltRef.current);
    tiltRef.current.style.backgroundPositionY = beta + '%';
    tiltRef.current.style.backgroundPositionX = alpha + '%';
  }

  async function requestDeviceOrientation() {
    console.log('clicked');
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      try {
        const permissionState =
          await DeviceOrientationEvent.requestPermission();
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
        } else {
          console.error('Access is not granted');
        }
      } catch (error) {
        console.error(error);
      }
    } else if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation);
    } else {
      console.error('Device does not support gyroscope');
    }
  }

  return (
    <>
      <div className="messages-wrapper">
        <div ref={tiltRef} className="messages">
          {messagesArr.map((item, index) => (
            <p key={index} className={`text ${item.sender}`}>
              <span className="text-p"></span>
              <span className="whitespace" />
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
