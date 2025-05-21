import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const useIncrease = () => setCount((prev) => prev + 1);
  const useDecrease = () => setCount((prev) => prev - 1);
  return (
    <>
      <span>Count: {count}</span>
      <button onClick={useIncrease}>Increase</button>
      <button onClick={useDecrease}>Decrease</button>
    </>
  );
};

export default Counter;
