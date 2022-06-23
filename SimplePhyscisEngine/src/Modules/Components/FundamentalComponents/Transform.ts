import { Vector } from "p5";
import IPhysicsObject from "../../Interfaces/IPhysicsObject";

export default class Transform {
  _position: Vector;
  _orginPosition: Vector;
  _rotation: number = 0;
  _scale: Vector = new Vector(1, 1);
  _orginScale: Vector;

  move(vector: Vector) {
    this._position.add(vector);
    this._orginPosition.add(vector);
    this._orginScale.add(vector);
  }
  rotate(angle: number) {
    this._rotation += angle;
  }
  setRotation(angle: number) {
    this._rotation = angle;
  }
  constructor(x: number, y: number) {
    this._position = new Vector(x, y);
    this._orginPosition = this._position;
    this._orginScale = this._position;
  }

  applyTransform(obj: IPhysicsObject) {
    obj._p5.translate(this._orginPosition);
    obj._p5.rotate(this._rotation);
    obj._p5.translate(-this._orginPosition.x, -this._orginPosition.y);

    obj._p5.translate(this._orginScale);
    obj._p5.scale(this._scale);
    obj._p5.translate(-this._orginScale.x, -this._orginScale.y);
  }
}
