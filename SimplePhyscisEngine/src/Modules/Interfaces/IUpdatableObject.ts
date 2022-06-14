import Context from "../Context/Context";

export default interface IUpdatableObject {
  id: number;
  _context: Context;
  update(): void;
  changeContext(context: Context): void;
  /**
   *
   */
}
