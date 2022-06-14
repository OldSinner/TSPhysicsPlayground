import { Vector } from "p5";
import IPhysicsObject from "../Interfaces/IPhysicsObject";
import { RigidBodyContext } from "./RigidBodyContext";

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
    obj.changeContext(this);
    if ("draw" in obj) {
      this.objects.push(obj);
    } else {
      this.objects.push(obj);
    }
  }
  public deleteObject(id: number) {
    this.objects = this.objects.filter((obj) => obj._id !== id);
  }
  //--------------------------------
  update(): void {
    this.applyPhyscisToAll();
    this.updateAll();
  }
  //--------------------------------

  updateAll(): void {
    this.objects.forEach((obj) => {
      obj.update();
    });
  }
  applyPhyscisToAll(): void {
    this.objects.forEach((obj) => {
      if (this._rigidContext.isRigidBody(obj)) {
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
}
