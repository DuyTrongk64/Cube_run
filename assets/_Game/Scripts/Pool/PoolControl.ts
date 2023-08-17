import {PoolMember} from "./PoolMember";
import {SimplePool} from "./SimplePool";
import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export class PoolAmount {
    @property(Node)
    public root: Node = null ;

    @property(Prefab)
    public prefab: PoolMember = null ;

    @property(Number)
    public amount: number = 0;
}

@ccclass('PoolControl')
export class PoolControl extends Component {
    @property(Array(PoolAmount))
    pools: PoolAmount[] = [];

    onLoad () {
        for (let i = 0; i < this.pools.length; i++){
            //SimplePool.preload(this.pools[i].prefab, this.pools[i].root, this.pools[i].amount);
        }
    }

}


