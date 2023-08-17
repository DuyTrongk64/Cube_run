import { SimplePool } from './SimplePool';
import { PoolType } from './SimplePool';
import { _decorator, Component, Node,Enum } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PoolMember')
export class PoolMember extends Component {
    @property({ type: Enum(PoolType) })
    public poolType: PoolType = PoolType.None;
}


