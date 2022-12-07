import { useState } from "react";
import shallow from "zustand/shallow";

import { Faucet } from "./Faucet";
import { Stream } from "./Stream";
import "./FaucetStreamHandler.css";
import { useAlgoStore } from "../lib/store";

export function FaucetStreamHandler(): JSX.Element {
  const storedValues = useAlgoStore(
    (state) => ({
      algo: state.algo,
      faucet: state.faucet,
    }),
    shallow
  );

  const [val, setVal] = useState(0);

  return (
    <div className="page">
      <div className="faucet">
        <div>
          {storedValues.algo}

          {storedValues.faucet}
        </div>
        <Stream setVal={setVal} delay={100} />
      </div>

      <div className="stream">
        <Faucet val={val} />
      </div>
    </div>
  );
}
