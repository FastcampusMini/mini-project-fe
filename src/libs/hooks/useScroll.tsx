import React, { useState, useEffect } from "react";

// ratio 는 0~1 사이 값, 0.5는 절반정도
const useScroll = () => {
  const [state, setState] = useState({
    x: 0, // x와 y의 초기값을 0으로 지정
    y: 0,
  });
  const onScroll = () => {
    setState({ x: window.scrollX, y: window.scrollY });
    console.log(state.x, state.y);
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll); // scorll할 때 onScroll 이벤트 핸들러 지정
    return () => window.removeEventListener("scroll", onScroll); // clean up
  }, []);
  return state;
};
