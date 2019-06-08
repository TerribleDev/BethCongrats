import React, { useState, useRef } from "react";
import pose from "react-pose";

import styles from "./App.module.scss";

const Header = pose.h1({
  start: {
    x: "-100vw"
  },
  end: {
    x: 0,
    transition: {
      duration: 1000
    }
  }
});
function Balloon({ x, y }) {
  const Posed = pose.span({
    start: {
      y: y
    },
    end: {
      y: `-${Math.ceil(Math.random() * 100000)}vh`,
      transition: {
        type: 'tween',
        duration: 100000,
        ease: 'circIn'
      }
    }
  })
  return (
    <Posed initialPose="start" pose="end" style={{ fontSize: "60px", position: "fixed", left: x, bottom: 0 }}>
      🎉
    </Posed>
  );
}
function App() {
  const [showBalloons, setShowBalloons] = useState(false);
  const refContainer = useRef();
  const width =
    refContainer &&
    refContainer.current &&
    refContainer.current.getBoundingClientRect().width;
  const balloons = [];
  if (showBalloons && width) {
    for(let row = 0; row < 1000; row = row + 100) {
      for (let i = 0; i < width; i = i + 60) {
        balloons.push(<Balloon key={`${i}-${row}`} x={i} y={row} />);
      }
    }
    
  }

  return (
    <>
      <div ref={refContainer} className={styles.app}>
        <Header
          initialPose="start"
          pose="end"
          onPoseComplete={() => setShowBalloons(true)}
          style={{ zIndex: 1000}}
        >
          Congratulations Beth!
        </Header>
      </div>
      {balloons}
    </>
  );
}

export default App;
