import IPhysicsObject from "../Interfaces/IPhysicsObject";

export default class Context {
  private objects: IPhysicsObject[] = [];
  private idCursor: number = 0;

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
  update(): void {
    this.objects.forEach((obj) => obj.update());
  }
}
