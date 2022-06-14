import IRigidbody from "../Interfaces/IRigidbody";

export default class DragForceSystem {
  private _object: IRigidbody;
  private _isDrag: boolean = true;

  constructor(object: IRigidbody) {
    this._object = object;
  }
}
