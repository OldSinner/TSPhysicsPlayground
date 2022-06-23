import { Vector } from "p5";
import IPhysicsObject from "../../Interfaces/IPhysicsObject";

export default class Transform {
  private _position: Vector;
  _orginPosition: Vector;
  _rotation: number = 0;
  _scale: Vector = new Vector(1, 1);
  constructor(x: number, y: number) {
    this._position = new Vector(x, y);
    this._orginPosition = this._position;
  }

  move(vector: Vector) {
    this._position.add(vector);
    this._orginPosition.add(vector);
  }

  setPosition(x: number, y: number) {
    const orgindif = this._position.copy().sub(this._orginPosition);
    this._position.set(x, y);
    this._orginPosition = this._position.copy().add(orgindif);
  }

  getPosition(): Vector {
    return this._position.copy();
  }

  rotate(angle: number) {
    this._rotation += angle;
  }

  setRotation(angle: number) {
    this._rotation = angle;
  }

  applyTransform(obj: IPhysicsObject) {
    obj._p5.translate(this._orginPosition);
    obj._p5.rotate(this._rotation);
    obj._p5.scale(this._scale);
    obj._p5.translate(-this._orginPosition.x, -this._orginPosition.y);
  }
}
