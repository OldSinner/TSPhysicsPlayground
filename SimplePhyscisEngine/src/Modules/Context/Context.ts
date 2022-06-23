import { Vector } from "p5";
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
  /**
   * Description placeholder
   *
   * @private
   * @type {IPhysicsObject[]}
   */
  private objects: IPhysicsObject[] = [];
  /**
   * Description placeholder
   *
   * @private
   * @type {number}
   */
  private idCursor: number = 0;
  /**
   * Description placeholder
   *
   * @private
   * @type {RigidBodyContext}
   */
  private _rigidContext: RigidBodyContext;

  /**
   * Creates an instance of Context.
   *
   * @constructor
   */
  constructor() {
    this._rigidContext = new RigidBodyContext();
  }

  /**
   * Description placeholder
   *
   * @public
   * @param {IPhysicsObject} obj
   */
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
  /**
   * Description placeholder
   *
   * @public
   * @param {number} id
   */
  public deleteObject(id: number) {
    this.objects = this.objects.filter((obj) => obj._id !== id);
  }
  /**
   * Description placeholder
   */
  start(): void {
    this.objects.forEach((obj) => {
      obj.start();
    });
  }
  //--------------------------------
  /**
   * Description placeholder
   */
  update(): void {
    this.applyPhyscisToAll();
    this.updateAll();
  }
  //--------------------------------

  /**
   * Description placeholder
   */
  updateAll(): void {
    this.objects.forEach((obj) => {
      obj.update();
    });
  }
  /**
   * Description placeholder
   */
  applyPhyscisToAll(): void {
    this.objects.forEach((obj) => {
      if (TypeCheck.isRigidBody(obj)) {
        this._rigidContext.applyWindToObj(obj);
      }
    });
  }
  //--------------------------------

  /**
   * Description placeholder
   *
   * @returns {Vector}
   */
  getGravityValue(): Vector {
    return this._rigidContext._gravity.copy();
  }
  /**
   * Description placeholder
   *
   * @param {Vector} wind
   */
  setWind(wind: Vector): void {
    this._rigidContext._windVector = wind;
  }
  /**
   * Description placeholder
   *
   * @public
   * @param {number} id
   * @returns {IPhysicsObject[]}
   */
  public getOtherObjects(id: number): IPhysicsObject[] {
    return this.objects.filter((obj) => obj._id !== id);
  }
  /**
   * Description placeholder
   *
   * @public
   * @returns {number}
   */
  public getGravityAttraction(): number {
    return this._rigidContext._gravityAttraction;
  }
  /**
   * Description placeholder
   *
   * @public
   * @param {number} gravityAttraction
   */
  public setGravityAttraction(gravityAttraction: number): void {
    this._rigidContext._gravityAttraction = gravityAttraction;
  }
}
