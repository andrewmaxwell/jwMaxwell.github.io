// import { Network } from "./network.js";
const { Network } = require("./network");

const trainingData = [
  {
    input: [0, 0],
    output: [0],
  },
  {
    input: [0, 1],
    output: [1],
  },
  {
    input: [1, 0],
    output: [1],
  },
  {
    input: [1, 1],
    output: [0],
  },
];

const print = (x, y) =>
  console.log(`${x} -> result: ${Math.round(y)}, actual: ${y}`);
const run = () => {
  let network = new Network([2, 10, 10, 1]);

  network.train(trainingData, 20000);

  for (const n of trainingData) print(n.input, network.run(n.input));
};

run();
