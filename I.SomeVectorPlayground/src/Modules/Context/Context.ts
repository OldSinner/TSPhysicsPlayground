import IDrawableObject from "../Interfaces/IDrawableObject";

export default class Context {
  private drawableObject: IDrawableObject[] = [];
  private idCursor: number = 0;

  public addObject(obj: IDrawableObject): void {
    obj.id = this.idCursor;
    this.idCursor++;
    obj.changeContext(this);
    this.drawableObject.push(obj);
  }
  public deleteObject(id: number) {
    this.drawableObject = this.drawableObject.filter((obj) => obj.id !== id);
  }

  update(): void {
    this.drawableObject.forEach((obj) => obj.update());
    this.draw();
  }
  private draw(): void {
    this.drawableObject.forEach((obj) => obj.draw());
  }
}
