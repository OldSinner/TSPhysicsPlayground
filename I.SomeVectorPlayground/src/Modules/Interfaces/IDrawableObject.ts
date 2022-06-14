import Context from "../Context/Context";

export default interface IDrawableObject {
  id: number;
  draw(): void;
  update(): void;
  changeContext(context: Context): void;
  /**
   *
   */
}
