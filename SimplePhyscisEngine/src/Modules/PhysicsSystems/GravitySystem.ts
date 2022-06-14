import IRigidbody from "../Interfaces/IRigidbody";

export default class GravitySystem {
  private _object: IRigidbody;
  _isGravity: boolean = true;
  constructor(object: IRigidbody) {
    this._object = object;
  }
  setEnabled(_isGravity: boolean): GravitySystem {
    this._isGravity = _isGravity;
    return this;
  }
  getState(): boolean {
    return this._isGravity;
  }
  applyGravity() {
    let gravity = this._object._context.getGravityValue();
    gravity.mult(this._object._mass);
    this._object.applyForce(gravity);
  }
}
