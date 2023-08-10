import { _decorator, Animation, Camera, CameraComponent, Component, Event, EventMouse, EventTouch, input, Input, misc, Node, Prefab, Quat, SystemEvent, tween, UITransform, Vec2, Vec3 } from 'cc';
import { Utilities } from './Utilities';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    private hp: number;

    protected speed: number;

    private canMove: boolean;

    private isTouch: boolean;

    @property({type: Prefab})
    animation_node: Prefab | null = null;

    // current character position
    private _curPos: Vec3 = new Vec3();
    // the difference in position of the current frame movement during each move
    private _deltaPos: Vec2 = new Vec2();
    // target position of the character
    private _targetPos: Vec3 = new Vec3();

    onLoad() {
        //set up move object
        input.on(Input.EventType.TOUCH_START, this.onTouchBegan, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMoved, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        
    }

    start() {
        this.hp = 5;
        this.speed = 5;
        this.canMove = false;
        this.isTouch = false;
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onTouchBegan, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMoved, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onStart() {

    }

    //bat dau an xuong
    private onTouchBegan(event: EventTouch) {
        this.canMove = true;
        this.isTouch = true;
        this.animation_node.play('a');
        this.node.getPosition(this._curPos);
        this.node.setRotation(new Quat(0, 1, 0, 0));
    }

    //di chuyen chuot
    private onTouchMoved(event) {

        let touches = event.getTouches();

        let touch1 = touches[0];
        this._deltaPos = touch1.getDelta();

        // this.node.getPosition(this._curPos);

        // this._targetPos.x = this._curPos.x + delta1.x;

        // console.log(this._targetPos.x);
    }

    private onTouchEnd(event) {
        this.isTouch = false;
    }

    startRun(deltaTime: number) {
        if (this.canMove) {

            let curPos = this.node.getPosition();
            curPos.z -= this.speed * deltaTime;
            this.node.setPosition(curPos);
            
        }
        if (this.isTouch) {
            this.node.getPosition(this._curPos);
            this._targetPos.x = this._deltaPos.x * deltaTime / 2;
            //console.log(this._deltaPos.x);
            Vec3.add(this._curPos, this._curPos, this._targetPos);
            this.node.setPosition(this._curPos);
        }
    }

    update(deltaTime: number) {
        this.startRun(deltaTime);
    }
}