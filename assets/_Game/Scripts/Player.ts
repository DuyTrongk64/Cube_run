import { _decorator, CameraComponent, Component, EventMouse, EventTouch, Input, input, misc, Node, tween, UITransform, v2, Vec2, Vec3, view } from 'cc';
import { Utilities } from './Utilities';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    private hp : number;

    protected speed: number;

    private detalPos:Vec2;

    private canMove: boolean;

    private lastMousePos: Vec2;

    private lastPlayerPos: Vec2;

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
        
    }

    //di chuyen chuot
    private onTouchMoved(event: EventTouch) {
        const move = event.getLocation();
        
        this.detalPos = move.subtract(this.lastMousePos);
        

        console.log(this.detalPos);
    }

    private onTouchEnd(event: EventTouch){
        lat
    }

    startRun(deltaTime: number){
        if(this.canMove){
            let curPos = this.node.getPosition();
            curPos.z -= this.speed*deltaTime;
            this.node.setPosition(curPos);
        }
    }

    update(deltaTime: number) {
        this.startRun(deltaTime);
    }
}

