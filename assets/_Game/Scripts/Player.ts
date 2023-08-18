import { _decorator, Animation, Camera, CameraComponent, Collider, ColliderComponent, Component, Event, EventMouse, EventTouch, input, Input, MeshRenderer, misc, Node, Prefab, Quat, SystemEvent, tween, UITransform, Vec2, Vec3, BoxCollider, ICollisionEvent, ITriggerEvent, director } from 'cc';
import { GameManager } from './Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property({ type: Animation })
    anim: Animation | null = null;

    @property(Number)
    state: number = 0;

    private hp: number;

    private speed: number;

    private canMove: boolean;

    private isTouch: boolean;

    private totalTime: number = 0;

    protected id: number = 1;

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


        // Xử lý sự kiện va chạm
        let collider = this.node.getComponent(Collider);
        // Listening to 'onCollisionStay' Events
        collider.on('onCollisionEnter', this.onCollision, this);

    }


    start() {
        this.hp = 5;
        this.speed = 10;
        this.canMove = false;
        this.isTouch = false;
        if(this.state == 0){
            GameManager.Ins.playerList.push(this);
        }
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onTouchBegan, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMoved, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onStart() {

    }

    private onCollision(event: ICollisionEvent) {
        
        if(this.state == 1){
            this.canMove = true;
            this.isTouch = true;
            this.node.getPosition(this._curPos);
            this.node.setRotation(new Quat(0, 1, 0, 0));
            this.state = 0;
            this.anim.play('run');
            GameManager.Ins.coutPlayer ++;
            GameManager.Ins.sumPlayer ++;
            this.id = GameManager.Ins.sumPlayer;
            //console.log(GameManager.Ins.coutPlayer);
            GameManager.Ins.playerList.push(this);

        }
        
        if(event.otherCollider.name == 'Cube<BoxCollider>'){
            this.node.active = false;
            GameManager.Ins.coutPlayer --;
            GameManager.Ins.playerList.splice(this.id-1,1);
            //console.log(GameManager.Ins.playerList);
        }

        if(event.otherCollider.name == 'End<BoxCollider>'){
            for(let i =0;i<GameManager.Ins.coutPlayer;i++){
                GameManager.Ins.playerList[i].node.setPosition(GameManager.Ins.player_field[i].getWorldPosition());
                GameManager.Ins.playerList[i].canMove = false;
                GameManager.Ins.playerList[i].anim.play('idle');
                GameManager.Ins.playerList[i].node.setRotation(new Quat(0, 0, 0, 0));

            }

        }
    }

    //bat dau an xuong
    onTouchBegan(event) {
        if (this.state == 0) {

            this.canMove = true;
            this.isTouch = true;
            this.node.getPosition(this._curPos);
            this.node.setRotation(new Quat(0, 1, 0, 0));

            this.anim.play('run');
        }

    }

    //di chuyen chuot
    onTouchMoved(event) {
    
        let touches = event.getTouches();

        let touch1 = touches[0];
        this._deltaPos = touch1.getDelta();

    }

    onTouchEnd(event) {
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
            this._targetPos.x = this._deltaPos.x * deltaTime/8;
            //console.log(this._deltaPos.x);
            Vec3.add(this._curPos, this._curPos, this._targetPos);
            this.node.setPosition(this._curPos);
        }
    }

    update(deltaTime: number) {
        this.startRun(deltaTime);

        // let cur = this.node.getPosition();
        // if(cur.z < -40){
        //     console.log(GameManager.Ins.ids);
        // }
    }
}