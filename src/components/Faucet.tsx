import { useEffect, useState, useRef } from "react";

import "./Faucet.css";
const LARGE_PRIME = 5915587277 as const;

export function Faucet({ val }: { val: number }): JSX.Element {
  const [seen, setSeen] = useState(0);

  const depth = 10;
  const width = 100;
  const hash = (
    num: number,
    a: number,
    b: number,
    p: number,
    w: number
  ): number => ((a * num + b) % p) % w;
  const randInt = (limit: number) => Math.trunc(Math.random() * limit);

  const [randomState] = useState(
    Array.from({ length: depth }).map<[number, number]>((_) => [
      randInt(LARGE_PRIME),
      randInt(LARGE_PRIME),
    ])
  );
  const hashes = randomState.map(
    ([a, b]) =>
      (num: number) =>
        hash(num, a, b, LARGE_PRIME, width)
  );

  const [sketch, setSketch] = useState<Array<Array<number>>>(
    Array.from({ length: depth }).map((_) =>
      Array.from<number>({ length: width }).fill(0)
    )
  );

  const countRef = useRef<HTMLInputElement>(null);

  const [count, setCount] = useState<number | null>(null);

  const [perfectCount, setPerfectCount] = useState<Record<number, number>>({});
  const [perfCount, setPerfCount] = useState(0);

  const getCount = () => {
    const subject = countRef.current!.valueAsNumber;

    const values = hashes.map((h, i) => sketch[i][h(subject)]);

    setCount(Math.min(...values));
    setPerfCount(perfectCount[subject] || 0);
  };

  useEffect(() => {
    setSeen(seen + 1);

    const newSketch: Array<Array<number>> = [];
    for (let index = 0; index < hashes.length; index++) {
      const hash = hashes[index];

      const oldSketchRow = [...sketch[index]];

      oldSketchRow[hash(val)] += 1;

      newSketch.push(oldSketchRow);
    }

    const newPerfCount = { ...perfectCount };

    newPerfCount[val] = (newPerfCount[val] || 0) + 1;
    setPerfectCount(newPerfCount);

    setSketch(newSketch);
  }, [val]);

  return (
    <div>
      <div>COUNT MIN SKETCH</div>
      <div>
        <input ref={countRef} type="number" />{" "}
        <button onClick={getCount}>GET COUNT</button>
        <p>SKETCH: {count}</p>
        <p>PERFECT: {perfCount}</p>
      </div>
      <div>
        <table>
          <tbody>
            {sketch.map((row, i) => (
              <tr key={i}>
                {row.map((value, j) => (
                  <td key={j}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
