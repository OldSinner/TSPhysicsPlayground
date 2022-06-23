import Rigidbody from "../Rigidbody";
import { FrictionTypes } from "../../../Enums/Forces/RigidBodyTypes";
import IPhysicsObject from "../../../Interfaces/IPhysicsObject";

export default class FrictionSystem {
  private _rbody: Rigidbody;
  private _isFriction: boolean = true;
  private _fritionMU: number = 0.1;
  private _staticFrictionForce: number = 5;
  private _frictionType: FrictionTypes = FrictionTypes.Static;
  constructor(rb: Rigidbody) {
    this._rbody = rb;
  }
  setFrictionType(type: FrictionTypes): FrictionSystem {
    this._frictionType = type;
    return this;
  }
  setEnabled(isFriction: boolean): FrictionSystem {
    this._isFriction = isFriction;
    return this;
  }
  getState(): boolean {
    return this._isFriction;
  }
  setFrictionMU(mu: number): FrictionSystem {
    this._fritionMU = mu;
    return this;
  }
  setStaticFrictionForce(force: number): FrictionSystem {
    this._staticFrictionForce = force;
    return this;
  }
  applyFriction(): void {
    switch (this._frictionType) {
      case FrictionTypes.Static:
        this._rbody._velocity.mult((100 - this._staticFrictionForce) / 100);
        break;
      case FrictionTypes.Kinetic:
        let friction = this._rbody._velocity.copy();
        friction.normalize();
        friction.mult(-1);
        friction.setMag(this._fritionMU * this._rbody._mass);
        this._rbody.applyForce(friction);

        break;
    }
  }
}
