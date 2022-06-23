import p5 from "p5";
import ICompontent from "../Interfaces/ICompontent";
import PhysicObject from "../Context/ContextObjects/PhysicObject";
import TypeCheck from "../Utils/TypeCheck";

/**
 * Description placeholder
 *  23.06.2022 - 23:13:05
 *
 * @export
 * @class CircleCollider
 * @typedef {CircleCollider}
 * @implements {ICompontent}
 */
export class CircleCollider implements ICompontent {
  /**
   * Creates an instance of CircleCollider.
   *
   * @constructor
   * @param {PhysicObject} _object
   */
  constructor(public _object: PhysicObject) {}
  /**
   * Description placeholder
   */
  update() {
    var objs = this._object._context.getOtherObjects(this._object._id);
    for (let i = 0; i < objs.length; i++) {
      if (
        TypeCheck.isComponent<CircleCollider>(objs[i]) &&
        TypeCheck.isPhysicObject(objs[i])
      ) {
        let obj = objs[i] as PhysicObject;
        this.checkCollision(obj.GetComponent<CircleCollider>());
      }
    }
  }
  /**
   * Description placeholder
   *
   * @param {CircleCollider} other
   * @returns {boolean}
   */
  checkCollision(other: CircleCollider): boolean {
    let dst = p5.Vector.dist(
      this._object._transform._position,
      other._object._transform._position
    );

    if (dst <= this._object._size / 2 + other._object._size / 2) {
      this.resolveCircle(other._object);
      return true;
    }
    return false;
  }
  /**
   * Description placeholder
   *
   * @param {PhysicObject} other
   */
  resolveCircle(other: PhysicObject): void {
    let dst = p5.Vector.sub(
      this._object._transform._position,
      other._transform._position
    );
    let dstLen = Math.sqrt(dst.x * dst.x + dst.y * dst.y);
    let unts = new p5.Vector(dst.x / dstLen, dst.y / dstLen);
    let radiussum = this._object._size / 2 + other._size / 2;
    this._object._transform._position.x =
      other._transform._position.x + radiussum * unts.x;
    this._object._transform._position.y =
      other._transform._position.y + radiussum * unts.y;
  }
}
