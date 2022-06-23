import PhysicObject from "../../Context/ContextObjects/PhysicObject";
import P5 from "p5";

export default class Square extends PhysicObject {
  _color = this._p5.color(255, 255, 255);
  _width;
  _height;
  constructor(
    public _p5: P5,
    x: number,
    y: number,
    _width: number = 100,
    _height: number = 10
  ) {
    super(_p5, x, y);
    this._width = _width;
    this._height = _height;
    const p5 = this._p5;
    this._color = p5.color(
      p5.random(100, 255),
      p5.random(100, 255),
      p5.random(100, 255)
    );
  }
  start(): void {}
  draw(): void {
    const p5 = this._p5;
    this._renderer.render(() => {
      p5.rectMode("center");
      p5.fill(this._color);
      p5.rect(
        this._transform._position.x,
        this._transform._position.y,
        this._width,
        this._height
      );
    });
  }
}
