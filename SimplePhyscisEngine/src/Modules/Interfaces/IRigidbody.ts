import P5 from "p5";

export default interface IRigidbody {
  _mass: number;
  _velocity: P5.Vector;
  _acceleration: P5.Vector;
  _velocityLimit: number;
  _isGravity: boolean;
  _isFriction: boolean;
  _fritionMU: number;
  setVelocityLimit(limit: number);
  applyForce(force: P5.Vector);
  applyGravity();
  applyFriction();
  constraintCheck(): void;
}
