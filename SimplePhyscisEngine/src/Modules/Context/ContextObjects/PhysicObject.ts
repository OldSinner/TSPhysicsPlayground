import { Vector } from "p5";
import P5 from "p5";
import Context from "../Context";
import IPhysicsObject from "../../Interfaces/IPhysicsObject";
import ICompontent from "../../Interfaces/ICompontent";
import TypeCheck from "../../Utils/TypeCheck";
import Transform from "../../Components/FundamentalComponents/Transform";
import Renderer from "../../Components/FundamentalComponents/Renderer";

/**
 * Description placeholder
 *
 * @export
 * @abstract
 * @class PhysicObject
 * @typedef {PhysicObject}
 * @implements {IPhysicsObject}
 */
export default abstract class PhysicObject implements IPhysicsObject {
  /**
   * Description placeholder
   *
   * @type {number}
   */
  _id: number;
  /**
   * Description placeholder
   *
   * @type {Context}
   */
  _context: Context;
  /**
   * Description placeholder
   *
   * @type {ICompontent[]}
   */
  _components: ICompontent[] = [];
  /**
   * Description placeholder
   *
   * @type {number}
   */
  _size: number = 3;
  /**
   * Description placeholder
   *
   * @type {Transform}
   */
  _transform: Transform;
  /**
   * Description placeholder
   *
   * @type {Renderer}
   */
  _renderer: Renderer = new Renderer(this);

  /**
   * Creates an instance of PhysicObject.
   *
   * @constructor
   * @param {P5} _p5
   * @param {number} x
   * @param {number} y
   */
  constructor(public _p5: P5, x: number, y: number) {
    this._transform = new Transform(x, y);
  }

  /**
   * Description placeholder
   */
  start(): void {}

  /**
   * Description placeholder
   */
  update() {
    this._components.forEach((component) => component.update());
    this.draw();
  }

  /**
   * Description placeholder
   */
  draw() {}

  /**
   * Description placeholder
   *
   * @param {Context} context
   * @returns {PhysicObject}
   */
  setContext(context: Context): PhysicObject {
    this._context = context;
    return this;
  }

  /**
   * Description placeholder
   *
   * @template T
   * @returns {(T | null)}
   */
  TryGetComponent<T>(): T | null {
    for (let i = 0; i < this._components.length; i++) {
      if (TypeCheck.isComponent<T>(this._components[i])) {
        return this._components[i] as T;
      }
    }
    return null;
  }
  /**
   * Description placeholder
   *
   * @template T
   * @returns {T}
   */
  GetComponent<T>(): T {
    for (let i = 0; i < this._components.length; i++) {
      if (TypeCheck.isComponent<T>(this._components[i])) {
        return this._components[i] as T;
      }
    }
    throw new Error("Component not found");
  }
}
