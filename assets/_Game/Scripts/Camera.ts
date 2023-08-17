import { _decorator, Component, misc, Node, Vec3 } from 'cc';
import { Player } from './Player';
const { ccclass, property } = _decorator;

@ccclass('Camera')
export class Camera extends Component {

    @property(Node)
    player: Node = null;

    private speed: number;
    private totalTime: number;

    start() {
        this.speed = 10;
        this.totalTime = 0;

    }

    startMove(deltaTime: number){
        let curPos = this.node.getPosition();
            curPos.z -= this.speed * deltaTime;
            this.node.setPosition(curPos);
    }
    update(deltaTime: number) {
        let curPlPos = this.player.getPosition();
        if (curPlPos.z <= -5) {
            this.startMove(deltaTime);
        }
    }
}

