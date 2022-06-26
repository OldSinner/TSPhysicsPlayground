import p5 from "p5";
import ICompontent from "../Interfaces/ICompontent";
import PhysicObject from "../Context/ContextObjects/PhysicObject";
import TypeCheck from "../Utils/TypeCheck";

export class CircleCollider implements ICompontent {
  constructor(public _object: PhysicObject) {}
  postUpdate() {}

  update() {
    var objs = this._object._context.getOtherObjects(this._object._id);
    for (let i = 0; i < objs.length; i++) {
      if (
        objs[i].TryGetComponent<CircleCollider>(CircleCollider) &&
        TypeCheck.isPhysicObject(objs[i])
      ) {
        let obj = objs[i] as PhysicObject;
        this.checkCollision(obj.GetComponent<CircleCollider>(CircleCollider));
      }
    }
  }

  checkCollision(other: CircleCollider): boolean {
    let dst = p5.Vector.dist(
      this._object._transform.getPosition(),
      other._object._transform.getPosition()
    );

    if (dst <= this._object._size / 2 + other._object._size / 2) {
      this.resolveCircle(other._object);
      return true;
    }
    return false;
  }

  resolveCircle(other: PhysicObject): void {
    let dst = p5.Vector.sub(
      this._object._transform.getPosition(),
      other._transform.getPosition()
    );
    let dstLen = Math.sqrt(dst.x * dst.x + dst.y * dst.y);
    let unts = new p5.Vector(dst.x / dstLen, dst.y / dstLen);
    let radiussum = this._object._size / 2 + other._size / 2;
    this._object._transform.setPosition(
      other._transform.getPosition().x + radiussum * unts.x,
      other._transform.getPosition().y + radiussum * unts.y
    );
  }
}
