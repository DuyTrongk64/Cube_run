import { _decorator, CameraComponent, Component, EventMouse, EventTouch, Input, input, misc, Node, tween, UITransform, v2, Vec2, Vec3, view } from 'cc';
import { Utilities } from './Utilities';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    private hp : number;

    protected speed: number;

    private targetpos: Vec3;

    private detalPos:Vec2;

    private canMove: boolean;

    private lastMousePos: Vec2;

    onLoad() {
        //set up move object
        input.on(Input.EventType.TOUCH_START, this.onTouchBegan, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMoved, this);
    }

    start() {
        this.hp = 5;
        this.speed = 5;
        this.canMove = false;

    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onTouchBegan, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMoved, this);
    }

    onStart() {

    }

    //bat dau an xuong
    private onTouchBegan(event: EventTouch) {
        this.canMove = true;
        this.lastMousePos = event.getLocation(); 
        this.targetpos = this.node.getPosition();
    }

    //di chuyen chuot
    private onTouchMoved(event: EventTouch) {
        const move = event.getLocation();
        
        this.detalPos = move.subtract(this.lastMousePos)
    
    }

    startRun(deltaTime: number){
        if(this.canMove){
            let curPos = this.node.getPosition();
            curPos.z -= this.speed*deltaTime;
            let newPos = new Vec3((this.targetpos.x+this.detalPos.x-curPos.x)*deltaTime,this.targetpos.y,curPos.z);
            this.node.setPosition(newPos);
        }
    }

    update(deltaTime: number) {
        this.startRun(deltaTime);
    }
}

