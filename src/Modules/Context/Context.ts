import { Vector } from "p5";
import Debuger from "../Components/Debuger";
import IPhysicsObject from "../Interfaces/IPhysicsObject";
import TypeCheck from "../Utils/TypeCheck";
import { RigidBodyContext } from "./RigidBodyContext";

/**
 * Description placeholder
 *
 * @export
 * @class Context
 * @typedef {Context}
 */
export default class Context {
  private objects: IPhysicsObject[] = [];
  private idCursor: number = 0;
  private _rigidContext: RigidBodyContext;
  constructor() {
    this._rigidContext = new RigidBodyContext();
  }
  public addObject(obj: IPhysicsObject): void {
    obj._id = this.idCursor;
    this.idCursor++;
    obj.setContext(this);
    if ("draw" in obj) {
      this.objects.push(obj);
    } else {
      this.objects.push(obj);
    }
  }

  public deleteObject(id: number) {
    this.objects = this.objects.filter((obj) => obj._id !== id);
  }

  start(): void {
    this.objects.forEach((obj) => {
      obj.start();
    });
  }
  //--------------------------------

  update(): void {
    this.applyPhyscisToAll();
    this.updateAll();
    this.postUpdateAll();
  }
  //--------------------------------

  updateAll(): void {
    this.objects.forEach((obj) => {
      obj.update();
    });
  }
  postUpdateAll(): void {
    this.objects.forEach((obj) => {
      obj.postUpdate();
    });
  }

  applyPhyscisToAll(): void {
    this.objects.forEach((obj) => {
      if (TypeCheck.isRigidBody(obj)) {
        this._rigidContext.applyWindToObj(obj);
      }
    });
  }
  //--------------------------------

  getGravityValue(): Vector {
    return this._rigidContext._gravity.copy();
  }

  setWind(wind: Vector): void {
    this._rigidContext._windVector = wind;
  }

  public getOtherObjects(id: number): IPhysicsObject[] {
    return this.objects.filter((obj) => obj._id !== id);
  }

  public getGravityAttraction(): number {
    return this._rigidContext._gravityAttraction;
  }

  public setGravityAttraction(gravityAttraction: number): void {
    this._rigidContext._gravityAttraction = gravityAttraction;
  }
}
