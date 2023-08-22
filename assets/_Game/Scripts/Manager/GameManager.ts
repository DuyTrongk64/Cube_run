import { _decorator, Component, game, Game, Node } from 'cc';
import { Player } from '../Player';
import { Camera } from '../Camera';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    // singleton
    private static ins: GameManager;

    public static get Ins(): GameManager {
        return GameManager.ins;
    }

    protected onLoad(): void {
        GameManager.ins = this;
    }

    public endRun: boolean;
    public coutPlayer: number;

    public sumPlayer: number = 1;

    @property(Node)
    public player_field: Node[] = [];
 
    @property(Node)
    public enemies_field: Node[] = [];

    @property(Node)
    public spawn_point: Node[] = [];

    @property(Camera)
    public camera: Camera;

    public playerList: Array<Player> = [];

    start() {
        this.coutPlayer = 1;
        this.endRun = false;
    }

    update(deltaTime: number) {
        if (this.coutPlayer == 0){
            console.log("pause game");
            game.pause();
        }

        if(this.endRun){
            let curPos = this.camera.node.getPosition();
            curPos.y = 35.697;
            curPos.z = -185.947;
            this.camera.node.setPosition(curPos);
            this.camera.node.setRotationFromEuler(-29.148,0,0);
            this.camera.canMove = false;
        }
    }

    
}


