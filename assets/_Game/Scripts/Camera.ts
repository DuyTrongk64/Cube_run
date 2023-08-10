import { _decorator, Component, misc, Node, Vec3 } from 'cc';
import { Player } from './Player';
const { ccclass, property } = _decorator;

@ccclass('Camera')
export class Camera extends Component {

    @property(Node)
    player: Node = null;

    private lastPlPos: Vec3 = new Vec3();
    private curPlPos: Vec3 = new Vec3();

    start() {
        this.lastPlPos = this.player.getPosition();
        this.lastPlPos.z = -5;
    }

    update(deltaTime: number) {
        this.curPlPos = this.player.getPosition();
        if (this.curPlPos.z <= -5) {
            let current_position = this.node.getPosition();
            current_position.z+=(this.curPlPos.z-this.lastPlPos.z);
            this.node.setPosition(current_position);
            this.lastPlPos=this.curPlPos;
        }
    }
}

