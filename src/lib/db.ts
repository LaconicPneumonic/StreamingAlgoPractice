// type user = {
//   name: string;
//   email: string;
//   id: string;
// };

export type Faucet = {
  uuid: string;
  name: string;
  outputType: "string" | "char" | "number";
  rawJsx: string;
  // owner: user["id"];
};

export type Algo = {
  uuid: string;
  name: string;
  inputType: "string" | "char" | "number";
  rawJsx: string;
  // owner: user["id"];
};

const data: {
  faucets: Array<Faucet>;
  algos: Array<Algo>;
} = {
  faucets: [
    {
      name: "Numbers",
      outputType: "number" as const,
      rawJsx: "",
    },
  ].map((f, i) => ({ uuid: `f${i}`, ...f })),

  algos: [
    {
      name: "Count Min Sketch",
      inputType: "number" as const,
      rawJsx: "",
    },
  ].map((a, i) => ({ uuid: `a${i}`, ...a })),
};

export default data;
