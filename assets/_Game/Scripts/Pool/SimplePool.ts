
import { PoolMember } from './PoolMember';
import { _decorator, Component, Enum, instantiate, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

export enum PoolType {
    None = 0,
    SubPlayer = 1,
}

@ccclass('SimplePool')
export class SimplePool extends Component {
    private static link: Map<PoolType, Pool> = new Map<PoolType, Pool>;

    //getter
    static isHasPool(poolType : PoolType): boolean {
        return this.link.has(poolType);
    }

    //setter
    static newPool(poolType : PoolType, pool: Pool): void {
        this.link.set(poolType, pool);
    }
    
    //setter
    static getPool(poolType : PoolType): Pool {
        return this.link.get(poolType);
    }

    public static preload(prefab: PoolMember, parentNode: Node, amount: number) {
        
        let pool = new Pool(prefab, parentNode, amount);
        if(!this.isHasPool(pool.poolType)){
            this.newPool(pool.poolType, pool);
        }
    }

    static spawn(nodeType: PoolType, pos: Vec3, angle: number = 0): PoolMember {
        console.log(nodeType);
        if(!this.isHasPool(nodeType)) console.error(" NEED PRELOAD POOL : " + nodeType + "!!!");
        return this.getPool(nodeType).spawn(pos, angle);
    }

    static spawnT<T>(nodeType: PoolType, pos: Vec3, angle: number): T {
        return this.spawn(nodeType, pos, angle) as T;
    }

    static despawn(clone: PoolMember) {
        this.getPool(clone.poolType).despawn(clone);
    }

    //TODO: lam not sau
    static collect(nodeType: PoolType) {
        this.getPool(nodeType).collect();
    }

    static collectAll() {

    }
}


class Pool {

    private parentNode: Node;
    private prefab: PoolMember;
    private list: PoolMember[] = [];

    public get poolType(): PoolType{
        return this.prefab.poolType;
    }

    constructor(prefab: PoolMember, parentNode: Node, amount: number) {
        this.preload(prefab, parentNode, amount);
    }

    public preload(prefab: PoolMember, parentNode: Node, amount: number) {
        this.prefab = instantiate(prefab).getComponent(PoolMember)
        this.parentNode = parentNode;

        for (let i = 0; i < amount; i++) {

            let clone = instantiate(this.prefab.node).getComponent(PoolMember);
            clone.node.active = false;
            this.parentNode.addChild(clone.node);

            this.list.push(clone);
        }
    }

    public spawn(pos: Vec3, angle: number): PoolMember {
        let clone = null;
        if (this.list.length > 0) {
            clone = this.list.shift();
        } else {
            clone = instantiate(this.prefab.node).getComponent(PoolMember);
            this.parentNode.addChild(clone.node);
        }

        clone.node.setWorldPosition(pos);
        clone.node.angle = angle;
        clone.node.active = true;

        return clone;
    }

    public despawn(clone: PoolMember) {
        if(clone.node.active){
            clone.node.active = false;
            this.list.push(clone);
        }

    }

    collect() {
    }

}

