import { Vector } from "p5";
import IPhysicsObject from "../../Interfaces/IPhysicsObject";

/**
 * Description placeholder
 * @date 23.06.2022 - 23:11:33
 *
 * @export
 * @class Transform
 * @typedef {Transform}
 */
export default class Transform {
  /**
   * Description placeholder
   *
   * @type {Vector}
   */
  _position: Vector;
  /**
   * Description placeholder
   *
   * @type {Vector}
   */
  _orginPosition: Vector;
  /**
   * Description placeholder
   *
   * @type {number}
   */
  _rotation: number = 0;
  /**
   * Description placeholder
   *
   * @type {Vector}
   */
  _scale: Vector = new Vector(1, 1);
  /**
   * Description placeholder
   *
   * @type {Vector}
   */
  _orginScale: Vector;

  /**
   * Description placeholder
   *
   * @param {Vector} vector
   */
  move(vector: Vector) {
    this._position.add(vector);
    this._orginPosition.add(vector);
    this._orginScale.add(vector);
  }
  /**
   * Description placeholder
   *
   * @param {number} angle
   */
  rotate(angle: number) {
    this._rotation += angle;
  }
  /**
   * Description placeholder
   *
   * @param {number} angle
   */
  setRotation(angle: number) {
    this._rotation = angle;
  }
  /**
   * Creates an instance of Transform.
   *
   * @constructor
   * @param {number} x
   * @param {number} y
   */
  constructor(x: number, y: number) {
    this._position = new Vector(x, y);
    this._orginPosition = this._position;
    this._orginScale = this._position;
  }

  /**
   * Description placeholder
   *
   * @param {IPhysicsObject} obj
   */
  applyTransform(obj: IPhysicsObject) {
    obj._p5.translate(this._orginPosition);
    obj._p5.rotate(this._rotation);
    obj._p5.translate(-this._orginPosition.x, -this._orginPosition.y);

    obj._p5.translate(this._orginScale);
    obj._p5.scale(this._scale);
    obj._p5.translate(-this._orginScale.x, -this._orginScale.y);
  }
}
