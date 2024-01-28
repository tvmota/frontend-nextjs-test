import { useState, useEffect, useRef } from "react";

type CounterProps = {
  initialCount: number;
};

export const Counter: React.FC<CounterProps> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);
  const isFirstRender = useRef(true);
  const onCounterUnmount = new CustomEvent("onCounterUnmount");
  const onCounterMount = new CustomEvent("onCounterMount");

  useEffect(() => {
    window.dispatchEvent(onCounterMount);

    return () => {
      window.dispatchEvent(onCounterUnmount);
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.dispatchEvent(
      new CustomEvent("onCounterUpdate", {
        detail: {
          count,
        },
      })
    );
  }, [count]);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={handleIncrement}>Incrementar +</button>
    </div>
  );
};
