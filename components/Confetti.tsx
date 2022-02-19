import React from "react";
import Confetti from "react-confetti";

// source: https://usehooks.com/useWindowSize/
const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default () => {
  const { width, height } = useWindowSize();
  return (
    <Confetti
      width={width}
      height={height}
      gravity={0.2}
      recycle={false}
      numberOfPieces={10000}
      tweenDuration={50000}
      initialVelocityX={8}
      initialVelocityY={16}
    />
  );
};
