import { _decorator, Component, game, Game, Node, Vec3 } from 'cc';
import { Player } from '../Player';
import { Camera } from '../Camera';
import PoolControl from '../newPool/PoolControl';

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

    @property(PoolControl)
    poolControl: PoolControl = null;

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
        this.spawnPrefab(1, new Vec3(0,0,-30));
    }

    update(deltaTime: number) {
        if (this.coutPlayer == 0){
            console.log("pause game");
            game.pause();
        }

        if(this.endRun){
            let curPos = this.camera.node.getPosition();
            curPos.y = 35.697;
            curPos.z = -115.947;
            this.camera.node.setPosition(curPos);
            this.camera.node.setRotationFromEuler(-29.148,0,0);
            this.camera.canMove = false;
        }
    }

    // Khi bạn muốn spawn prefab
    spawnPrefab(prefabIndex: number, position: Vec3) {
        this.poolControl.spawn(prefabIndex, position);
    }

    // Khi bạn muốn despawn prefab
    despawnPrefab(prefabIndex: number, targetNode: Node) {
        this.poolControl.despawn(prefabIndex, targetNode);
    }


}


