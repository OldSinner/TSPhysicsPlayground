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
  /**
   * Description placeholder
   *
   * @type {p5}
   */
  _p5: p5;
  /**
   * Description placeholder
   *
   * @type {number}
   */
  _id: number;
  /**
   * Description placeholder
   *
   * @type {Transform}
   */
  _transform: Transform;
  /**
   * Description placeholder
   *
   * @type {Context}
   */
  _context: Context;
  /**
   * Description placeholder
   *
   * @type {ICompontent[]}
   */
  _components: ICompontent[];
  /**
   * Description placeholder
   */
  update(): void;
  /**
   * Description placeholder
   */
  start(): void;
  /**
   * Description placeholder
   *
   * @param {Context} context
   */
  setContext(context: Context): void;
  /**
   * Description placeholder
   *
   * @returns {ICompontent}
   */
  GetComponent(): ICompontent;
  /**
   * Description placeholder
   *
   * @template T
   * @returns {(T | null)}
   */
  TryGetComponent<T>(): T | null;
}
