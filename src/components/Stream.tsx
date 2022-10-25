import React from "react";
import { useEffect, useState } from "react";

export function Stream({
  setVal,
  delay,
}: {
  setVal: (num: number) => void;
  delay: number;
}): JSX.Element {
  const memoryLength = 10;

  const [stream, setStream] = useState<number | null>(null);

  function infiniteValueWithinRange(max = 1) {
    return {
      next() {
        return { value: Math.trunc(Math.random() * max), done: false };
      },
    };
  }

  useEffect(() => {
    const it = infiniteValueWithinRange(1000);
    const interval = setInterval(() => {
      const n = it.next();

      setVal(n.value);
      setStream((_) => n.value);
    }, delay);

    return () => clearInterval(interval);
  }, [delay]);

  const [memory, setMemory] = useState<Array<number | null>>(
    Array.from<null>({ length: memoryLength }).fill(null)
  );

  useEffect(() => {
    const newMemory = memory.concat(stream);
    if (newMemory.length > memoryLength) newMemory.shift();
    setMemory(newMemory);
  }, [stream]);

  return (
    <div className="container">
      {memory.map((m, i) => (
        <div
          className={i == memory.length - 1 ? "highlight square" : "square"}
          key={i}
        >
          <b>{m}</b>
        </div>
      ))}
    </div>
  );
}
