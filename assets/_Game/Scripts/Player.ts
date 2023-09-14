import { _decorator, Animation, Node, Camera, Collider, Component, geometry, input, Input, EventTouch, PhysicsSystem, Quat, SystemEvent, tween, UITransform, Vec2, Vec3, BoxCollider, ICollisionEvent, ITriggerEvent, director, RigidBody, physics, debug } from 'cc';
import { GameManager } from './Manager/GameManager';

const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component  {

    @property({ type: Animation })
    anim: Animation | null = null;

    @property(Number)
    state: number = 0;

    private hp: number;

    private speed: number;

    private canMove: boolean;

    private isTouch: boolean;

    private endRun: boolean;

    private targetPlayer: boolean;

    protected id: number = 1;

    // current character position
    private _curPos: Vec3 = new Vec3();
    // the difference in position of the current frame movement during each move
    private _deltaPos: Vec2 = new Vec2();
    // target position of the character
    private _targetPos: Vec3 = new Vec3();

    // Specify the camera rendering the target node.
    @property(Camera)
    readonly cameraCom!: Camera;

    @property(Node)
    public targetNode!: Node;

    private _ray: geometry.Ray = new geometry.Ray();


    onLoad() {
        //set up move object
        input.on(Input.EventType.TOUCH_START, this.onTouchBegan, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMoved, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        PhysicsSystem.instance
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
        this.endRun = false;
        this.targetPlayer = false;

        if (this.state == 0) {
            GameManager.Ins.playerList.push(this);
        }
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onTouchBegan, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMoved, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private onCollision(event: ICollisionEvent) {

        if (this.state == 1) {
            this.canMove = true;
            this.isTouch = true;
            this.node.getPosition(this._curPos);
            this.node.setRotation(new Quat(0, 1, 0, 0));
            this.state = 0;
            this.anim.play('run');
            GameManager.Ins.coutPlayer++;
            GameManager.Ins.sumPlayer++;
            this.id = GameManager.Ins.sumPlayer;
            //console.log(GameManager.Ins.coutPlayer);
            GameManager.Ins.playerList.push(this);
            console.log(GameManager.Ins.coutPlayer);


        }
        //console.log(event.otherCollider.getComponent(RigidBody).group);
        if (event.otherCollider.getComponent(RigidBody).group == 2) {
            this.node.active = false;
            GameManager.Ins.coutPlayer--;
            GameManager.Ins.playerList.splice(this.id - 1, 1);
            console.log(GameManager.Ins.coutPlayer);
        }



        if (event.otherCollider.name == 'End<BoxCollider>') {
            for (let i = 0; i < GameManager.Ins.coutPlayer; i++) {
                GameManager.Ins.playerList[i].node.setPosition(GameManager.Ins.player_field[i].getWorldPosition());
                GameManager.Ins.playerList[i].canMove = false;
                GameManager.Ins.playerList[i].anim.play('idle');
                GameManager.Ins.playerList[i].node.setRotation(new Quat(0, 0, 0, 0));
                GameManager.Ins.playerList[i].endRun = true;
            }

            GameManager.Ins.endRun = true;


        }
    }

    //bat dau an xuong
    onTouchBegan(event: EventTouch) {

        if (this.state == 0 && !this.endRun) {

            this.canMove = true;
            this.isTouch = true;
            this.node.getPosition(this._curPos);
            this.node.setRotation(new Quat(0, 1, 0, 0));
            console.log(this.endRun);

            this.anim.play('run');
        }

        if (this.endRun) {
            const touch = event.touch!;

            this.cameraCom.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);
            if (PhysicsSystem.instance.raycast(this._ray)) {
                const raycastResults = PhysicsSystem.instance.raycastResults;
                for (let i = 0; i < raycastResults.length; i++) {
                    const item = raycastResults[i];
                    if (item.collider.node == this.targetNode) {
                        this.targetPlayer = true;

                        console.log('raycast hit the target node !');
                        console.log(this.endRun);
                        break;
                    }
                }
            }
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
        this.targetPlayer = false;
    }

    startRun(deltaTime: number) {
        if (this.canMove) {
            let curPos = this.node.getPosition();
            curPos.z -= this.speed * deltaTime;
            this.node.setPosition(curPos);

        }
        if (this.isTouch) {
            this.node.getPosition(this._curPos);
            this._targetPos.x = this._deltaPos.x * deltaTime;
            //console.log(this._deltaPos.x);
            Vec3.add(this._curPos, this._curPos, this._targetPos);
            this.node.setPosition(this._curPos);
        }
    }

    movePlayer(deltaTime: number) {
        if (this.targetPlayer && this.endRun) {
            this.node.getPosition(this._curPos);
            this._targetPos.x = this._deltaPos.x * deltaTime;
            this._targetPos.z = -this._deltaPos.y * deltaTime;
            //console.log(this._deltaPos.x);
            Vec3.add(this._curPos, this._curPos, this._targetPos);
            this.node.setPosition(this._curPos);
        }
    }

    update(deltaTime: number) {
        this.startRun(deltaTime);
        this.movePlayer(deltaTime);
        // let cur = this.node.getPosition();
        // if(cur.z < -40){
        //     console.log(GameManager.Ins.ids);
        // }
    }
}