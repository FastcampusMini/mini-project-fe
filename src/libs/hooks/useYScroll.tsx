import { useState, useEffect, useMemo } from 'react';
import { throttle } from 'lodash';

const useYScroll = (ref, wait = 100) => {
  const [yScroll, setYScroll] = useState(0);

  const handleScroll = useMemo(() => {
    return throttle(() => {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      const scrollRatio = scrollTop / (scrollHeight - clientHeight);
      setYScroll(scrollRatio);
    }, wait);
  }, [ref, wait]);

  useEffect(() => {
    ref.current.addEventListener('scroll', handleScroll);

    return () => {
      ref?.current?.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [ref, handleScroll]);

  return yScroll;
};
export default useYScroll;
