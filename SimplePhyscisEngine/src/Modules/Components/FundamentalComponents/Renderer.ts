import IPhysicsObject from "../../Interfaces/IPhysicsObject";

export default class Renderer {
  _obj: IPhysicsObject;

  constructor(obj: IPhysicsObject) {
    this._obj = obj;
  }

  render(render: Function) {
    this._obj._p5.push();
    this._obj._transform.applyTransform(this._obj);
    render();
    this._obj._p5.pop();
  }
}
