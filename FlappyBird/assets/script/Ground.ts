import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {

    @property ({ type: CCInteger })
    public speed: number = -300;

    @property ({ type: CCInteger })
    public resetX: number = -300;

    private canScroll: boolean = false;

    onLoad() {
        this.canScroll = true;
    }

    update(deltaTime: number) {
        if (!this.canScroll) return;
        this.node.setPosition(this.node.position.x + this.speed * deltaTime, this.node.position.y);
        if (this.node.position.x <= this.resetX) {
            this.node.setPosition(this.node.position.x - this.resetX, this.node.position.y);
        }
    }

    startScroll() {
        this.canScroll = true;
    }

    stopScroll() {
        this.canScroll = false;
    }
    
}


