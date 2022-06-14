import P5 from "p5";

const sketch = (p5: P5) => {
  p5.setup = () => {
    p5.createCanvas(400, 400);
  };
  p5.draw = () => {};
};

new P5(sketch);
