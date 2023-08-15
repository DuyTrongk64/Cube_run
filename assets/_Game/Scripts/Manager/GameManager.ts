import { _decorator, Component, game, Game, Node } from 'cc';
import { Player } from '../Player';
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

    public coutPlayer: number;

    start() {
        this.coutPlayer = 1;
    }

    update(deltaTime: number) {
        if (this.coutPlayer == 0){
            console.log("pause game");

            game.pause();
        }
    }
}


