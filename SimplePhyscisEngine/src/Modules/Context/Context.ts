import IDrawableObject from "../Interfaces/IDrawableObject";
import IUpdatableObject from "../Interfaces/IUpdatableObject";

export default class Context {
  private drawableObjects: IDrawableObject[] = [];
  private updatableObjects: IUpdatableObject[] = [];
  private idCursor: number = 0;

  public addObject(obj: IDrawableObject | IUpdatableObject): void {
    obj.id = this.idCursor;
    this.idCursor++;
    obj.changeContext(this);
    if ("draw" in obj) {
      this.drawableObjects.push(obj);
    } else {
      this.updatableObjects.push(obj);
    }
  }
  public deleteObject(id: number) {
    this.drawableObjects = this.drawableObjects.filter((obj) => obj.id !== id);
    this.updatableObjects = this.updatableObjects.filter(
      (obj) => obj.id !== id
    );
  }

  update(): void {
    this.drawableObjects.forEach((obj) => obj.update());
    this.updatableObjects.forEach((obj) => obj.update());
    this.draw();
  }
  private draw(): void {
    this.drawableObjects.forEach((obj) => obj.draw());
  }
}
