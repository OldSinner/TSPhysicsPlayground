import P5 from "p5";
import Context from "../Context/Context";

export default interface IPhysicsObject {
  _id: number;
  _position: P5.Vector;
  _context: Context;

  update(): void;
  changeContext(context: Context): void;
}
