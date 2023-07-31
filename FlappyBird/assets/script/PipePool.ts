import { _decorator, CCInteger, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {
    
    @property ({ type: CCInteger })
    public speed: number = -300;

    @property ({ type: CCInteger })
    public resetX: number = -300;

    @property ({ type: Prefab })
    public pipePrefab: Prefab = null;

    public canScroll: boolean = false;

    addPipe() {
        this.node.addChild(instantiate(this.pipePrefab));
    }

    startScroll() {
        this.canScroll = true;
    }

    stopScroll() {
        this.canScroll = false;
    }
    
}


