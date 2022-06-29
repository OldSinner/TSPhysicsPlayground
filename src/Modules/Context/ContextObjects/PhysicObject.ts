import { Vector } from "p5";
import P5 from "p5";
import Context from "../Context";
import IPhysicsObject from "../../Interfaces/IPhysicsObject";
import ICompontent from "../../Interfaces/ICompontent";
import TypeCheck from "../../Utils/TypeCheck";
import Transform from "../../Components/FundamentalComponents/Transform";
import Renderer from "../../Components/FundamentalComponents/Renderer";
import Debuger from "../../Components/Debuger";
import { Constructor } from "../../Enums/Types/Constructor";
import Rigidbody from "../../Components/Rigidbody/Rigidbody";

export default abstract class PhysicObject implements IPhysicsObject {
  _id: number;
  _context: Context;
  _components: ICompontent[] = [];
  _size: number = 3;
  _transform: Transform;
  _renderer: Renderer = new Renderer(this);
  debuger: Debuger;

  constructor(public _p5: P5, x: number, y: number) {
    this._transform = new Transform(x, y, this);
  }
  postUpdate() {
    this._components.forEach((component) => component.postUpdate());
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

  TryGetComponent<T>(className: Constructor<T>): T | false {
    for (let i = 0; i < this._components.length; i++) {
      if (this._components[i] instanceof className) {
        return this._components[i] as T;
      }
    }
    return false;
  }

  GetComponent<T>(className: Constructor<T>): T {
    for (let i = 0; i < this._components.length; i++) {
      if (this._components[i] instanceof className) {
        return this._components[i] as T;
      }
    }
    throw new Error("Component not found");
  }
  AddComponent(component: ICompontent) {
    this._components.push(component);
  }
}
