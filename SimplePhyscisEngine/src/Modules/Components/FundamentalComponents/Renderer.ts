import IPhysicsObject from "../../Interfaces/IPhysicsObject";

/**
 * Description placeholder
 *
 * @export
 * @class Renderer
 * @typedef {Renderer}
 */
export default class Renderer {
  /**
   * Description placeholder
   *
   * @type {IPhysicsObject}
   */
  _obj: IPhysicsObject;
  /**
   * Creates an instance of Renderer.
   *
   * @constructor
   * @param {IPhysicsObject} obj
   */
  constructor(obj: IPhysicsObject) {
    this._obj = obj;
  }

  /**
   * Description placeholder
   *
   * @param {Function} render
   */
  render(render: Function) {
    this._obj._p5.push();
    this._obj._transform.applyTransform(this._obj);
    render();
    this._obj._p5.pop();
  }
}
