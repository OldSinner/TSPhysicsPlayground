import IRigidbody from "../Interfaces/IRigidbody";

export default class DragForceSystem {
  private _object: IRigidbody;
  private _isDrag: boolean = true;
  private _dragCoefficient: number = 0.1;

  constructor(object: IRigidbody) {
    this._object = object;
  }

  applyDrag() {
    let dragForce = this._object._velocity.copy();
    dragForce.normalize();
    dragForce.mult(-1);
    let speed = this._object._velocity.mag();
    dragForce.setMag(this._dragCoefficient * speed * speed);

    this._object.applyForce(dragForce);
  }

  getstate(): boolean {
    return this._isDrag;
  }
}
