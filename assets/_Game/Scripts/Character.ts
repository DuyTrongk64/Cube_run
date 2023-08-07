import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Character')
export class Character extends Component {

    private hp: number;

    //getter
    get isDead(): boolean {
        return this.hp <= 0;
    }

    //khởi tạo
    public onInit(hp: number) {
        this.hp = hp;
    }

    //nhận damage
    public onHit(damage: number) {
        if (!this.isDead) {
            this.hp -= damage;
            if (this.isDead) {
                this.onDeath();
            }
        }
    }

    protected onDeath() {
        // this.onDeathAction(this);
    }
}

