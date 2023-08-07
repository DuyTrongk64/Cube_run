import { _decorator, Component, EventMouse, EventTouch, Node, Vec2 } from 'cc';
import { Character } from './Character';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Character {

    protected speed: number;

    private touchOffset: Vec2;



    public onInit(hp: number): void {
        super.onInit(hp);
        this.speed = 500;
    }

    start() {
        this.onInit(5);

        //set up move object
        this.node.on(Node.EventType.TOUCH_START, this.onTouchBegan, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMoved, this);

    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchBegan, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMoved, this);
    }

    //bat dau an xuong
    private onTouchBegan(event: EventTouch)/*: boolean*/ {
        this.onStart();
        this.touchOffset = Utilities.vec3ToVec2(this.node.position).subtract(this.getMousePoint(event));
    }

    //di chuyen chuot
    private onTouchMoved(event: EventTouch) {
        const newPos = this.getMousePoint(event).add(this.touchOffset);

        newPos.x = misc.clampf(newPos.x, this.clampHorizon.x, this.clampHorizon.y);
        newPos.y = misc.clampf(newPos.y, this.clampVertical.x, this.clampVertical.y);

        this.node.position = Utilities.vec2ToVec3(newPos);
    }

    //lay vi tri chuot bam xuong
    private getMousePoint(event: Event.EventTouch): Vec2 {
        return event.getLocation().sub(v2(this.screen.x * 0.5, this.screen.y * 0.5));
    }

    update(deltaTime: number) {

    }
}

