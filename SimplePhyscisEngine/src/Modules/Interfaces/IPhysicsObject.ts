import P5 from "p5";
import Context from "../Context/Context";
import ICompontent from "./ICompontent";

export default interface IPhysicsObject {
  _id: number;
  _position: P5.Vector;
  _context: Context;
  _components: ICompontent[];
  update(): void;
  start(): void;
  setContext(context: Context): void;
  GetComponent(): ICompontent;
  TryGetComponent(compType: any): ICompontent | null;
}
