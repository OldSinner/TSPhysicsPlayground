import Rigidbody from "../Rigidbody";

/**
 * Description placeholder
 *
 * @export
 * @class DragForceSystem
 * @typedef {DragForceSystem}
 */
export default class DragForceSystem {
  /**
   * Description placeholder
   *
   * @private
   * @type {Rigidbody}
   */
  private _rboody: Rigidbody;
  /**
   * Description placeholder
   *
   * @private
   * @type {boolean}
   */
  private _isDrag: boolean = true;
  /**
   * Description placeholder
   *
   * @private
   * @type {number}
   */
  private _dragCoefficient: number = 0.1;

  /**
   * Creates an instance of DragForceSystem.
   *
   * @constructor
   * @param {Rigidbody} object
   */
  constructor(object: Rigidbody) {
    this._rboody = object;
  }

  /**
   * Description placeholder
   */
  applyDrag() {
    let dragForce = this._rboody._velocity.copy();
    dragForce.normalize();
    dragForce.mult(-1);
    let speed = this._rboody._velocity.mag();
    dragForce.setMag(this._dragCoefficient * speed * speed);

    this._rboody.applyForce(dragForce);
  }
  /**
   * Description placeholder
   *
   * @param {boolean} _isDrag
   * @returns {DragForceSystem}
   */
  setEnabled(_isDrag: boolean): DragForceSystem {
    this._isDrag = _isDrag;
    return this;
  }

  /**
   * Description placeholder
   *
   * @returns {boolean}
   */
  getstate(): boolean {
    return this._isDrag;
  }
}
