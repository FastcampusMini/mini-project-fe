import { useState, useEffect } from 'react';

function useYScroll(ref) {
  const [yScroll, setYScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop } = ref.current;
      setYScroll(scrollTop);
    };

    ref?.current?.addEventListener('scroll', handleScroll);

    return () => {
      ref?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return yScroll;
}

export default useYScroll;
