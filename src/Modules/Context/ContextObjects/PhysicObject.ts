import { Vector } from "p5";
import P5 from "p5";
import Context from "../Context";
import IPhysicsObject from "../../Interfaces/IPhysicsObject";
import ICompontent from "../../Interfaces/ICompontent";
import TypeCheck from "../../Utils/TypeCheck";
import Transform from "../../Components/FundamentalComponents/Transform";
import Renderer from "../../Components/FundamentalComponents/Renderer";

export default abstract class PhysicObject implements IPhysicsObject {
  _id: number;
  _context: Context;
  _components: ICompontent[] = [];
  _size: number = 3;
  _transform: Transform;
  _renderer: Renderer = new Renderer(this);

  constructor(public _p5: P5, x: number, y: number) {
    this._transform = new Transform(x, y);
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
