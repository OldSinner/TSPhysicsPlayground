import { Vector } from "p5";
import P5 from "p5";
import Context from "../../Context/Context";
import IPhysicsObject from "../../Interfaces/IPhysicsObject";
import ICompontent from "../../Interfaces/ICompontent";
import TypeCheck from "../../Utils/TypeCheck";

export default abstract class PhysicObject implements IPhysicsObject {
  _id: number;
  _position: Vector;
  _context: Context;
  _components: ICompontent[] = [];
  _size: number = 3;
  constructor(public _p5: P5, x: number, y: number) {
    this._position = new P5.Vector(x, y);
  }

  start(): void {}

  update() {
    this._components.forEach((component) => component.update());
    this.draw();
  }

  draw() {}

  setContext(context: Context): PhysicObject {
    this._context = context;
    return this;
  }

  TryGetComponent<T>(): T | null {
    for (let i = 0; i < this._components.length; i++) {
      if (TypeCheck.isComponent<T>(this._components[i])) {
        return this._components[i] as T;
      }
    }
    return null;
  }
  GetComponent<T>(): T {
    for (let i = 0; i < this._components.length; i++) {
      if (TypeCheck.isComponent<T>(this._components[i])) {
        return this._components[i] as T;
      }
    }
    throw new Error("Component not found");
  }
}
