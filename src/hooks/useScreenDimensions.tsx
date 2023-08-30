import { useEffect, useState } from 'react';

interface useScreenDimensionsReturnType {
  height: number;
  width: number;
}

const useScreenDimensions = (): useScreenDimensionsReturnType => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const resize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return {
    width,
    height,
  };
};

export default useScreenDimensions;
