import PhysicObject from "./Abstracts/PhysicObject";
import P5 from "p5";
import IPhysicsObject from "../Interfaces/IPhysicsObject";

export default class TargetObj extends PhysicObject {
  _size: number = 3;
  _target: IPhysicsObject;
  _targetAttraction: number = 0.1;
  constructor(public _p5: P5, x: number, y: number) {
    super(_p5, x, y);
    this._gravitySystem.setEnabled(false);
  }
  draw(): void {
    const p5 = this._p5;
    p5.stroke(p5.color(255, 255, 255));
    p5.strokeWeight(this._size * this._mass);
    p5.point(this._position.x, this._position.y);
  }
  update(): void {
    this.follow();
    super.update();
  }
  follow(): void {
    const p5 = this._p5;
    const targetPos = this._target._position.copy();
    targetPos.sub(this._position);
    targetPos.setMag(this._targetAttraction);
    this._acceleration.add(targetPos);
  }
  setTarget(target: IPhysicsObject): PhysicObject {
    this._target = target;
    return this;
  }
}
