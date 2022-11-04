import { useState } from "react";
import { Faucet } from "./Faucet";
import { Stream } from "./Stream";

import "./FaucetStreamHandler.css";

export function FaucetStreamHandler(): JSX.Element {
  const [val, setVal] = useState(0);

  return (
    <div className="page">
      <div className="faucet">
        <Stream setVal={setVal} delay={100} />
      </div>

      <div className="stream">
        <Faucet val={val} />
      </div>
    </div>
  );
}
