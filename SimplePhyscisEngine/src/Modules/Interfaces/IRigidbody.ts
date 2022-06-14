import P5 from "p5";

export default interface IRigidbody {
  _mass: number;
  _velocity: P5.Vector;
  _acceleration: P5.Vector;
  _velocityLimit: number;
  setVelocityLimit(limit: number);
}
