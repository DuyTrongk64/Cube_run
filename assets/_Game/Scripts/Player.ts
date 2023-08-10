import { _decorator, Camera, CameraComponent, Component, Event, EventMouse, EventTouch, misc, Node, SystemEvent, systemEvent, tween, UITransform, v2, Vec2, Vec3, view } from 'cc';
import { Utilities } from './Utilities';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property(Camera)
    camera: Camera = null;

    private hp: number;

    protected speed: number;

    private canMove: boolean;

    private playerOff_set: Vec2;
    onLoad() {
        //set up move object
        this.node.on(Node.EventType.TOUCH_START, this.onTouchBegan, this,true);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMoved, this,true);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this,true);
        this.camera.priority = 1;
    }

    start() {
        this.hp = 5;
        this.speed = 5;
        this.canMove = false;
    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchBegan, this,true);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMoved, this,true);
        
    }

    onStart() {

    }

    //bat dau an xuong
    private onTouchBegan(event) {
        this.canMove = true;
        //event.propagationStopped = true;
    }

    //di chuyen chuot
    private onTouchMoved(event) {
        
        let touches = event.getTouches();
            
        let touch1 = touches[0];
        let delta1 = touch1.getDelta();
        this.playerOff_set.x = delta1.x;
        let playerPos = this.node.getPosition();
        playerPos.x = playerPos.x + delta1;
        this.node.setPosition(playerPos);
    }

    private onTouchEnd(event) {
        
    }

    startRun(deltaTime: number) {
        if (this.canMove) {
            let curPos = this.node.getPosition();
            curPos.z -= this.speed * deltaTime;
            this.node.setPosition(curPos);
        }
    }

    update(deltaTime: number) {
        this.startRun(deltaTime);
    }
}