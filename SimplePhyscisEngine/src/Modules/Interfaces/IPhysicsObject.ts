import p5 from "p5";
import Transform from "../Components/FundamentalComponents/Transform";
import Context from "../Context/Context";
import ICompontent from "./ICompontent";

/**
 * Description placeholder
 *
 * @export
 * @interface IPhysicsObject
 * @typedef {IPhysicsObject}
 */
export default interface IPhysicsObject {
  _p5: p5;
  _id: number;
  _transform: Transform;
  _context: Context;
  _components: ICompontent[];

  update(): void;

  start(): void;

  setContext(context: Context): void;

  GetComponent<T>(): ICompontent;

  TryGetComponent<T>(): T | null;
}
