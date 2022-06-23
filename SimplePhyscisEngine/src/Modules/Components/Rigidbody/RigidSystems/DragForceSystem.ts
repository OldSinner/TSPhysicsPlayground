import Rigidbody from "../Rigidbody";

export default class DragForceSystem {
  private _rboody: Rigidbody;
  private _isDrag: boolean = true;
  private _dragCoefficient: number = 0.1;

  constructor(object: Rigidbody) {
    this._rboody = object;
  }

  applyDrag() {
    let dragForce = this._rboody._velocity.copy();
    dragForce.normalize();
    dragForce.mult(-1);
    let speed = this._rboody._velocity.mag();
    dragForce.setMag(this._dragCoefficient * speed * speed);

    this._rboody.applyForce(dragForce);
  }
  setEnabled(_isDrag: boolean): DragForceSystem {
    this._isDrag = _isDrag;
    return this;
  }

  getstate(): boolean {
    return this._isDrag;
  }
}
