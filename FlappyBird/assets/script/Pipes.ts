import { _decorator, Component, find, Node, screen } from 'cc';
const { ccclass, property } = _decorator;

const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

@ccclass('Pipes')
export class Pipes extends Component {
    
    @property ({ type: Node })
    public topPipe: Node;

    @property ({ type: Node })
    public bottomPipe: Node;

    private scene = screen.windowSize;
    private pool = null;
    private menu = null;
    private ground = null;
    private isPassed: boolean;

    onLoad() {
        this.pool = find("Canvas/PipePool").getComponent("PipePool");
        this.menu = find("Canvas/Menu").getComponent("Menu");
        this.ground = find("Canvas/Ground").getPosition();
        this.isPassed = false;
        this.initPos();
    }

    initPos() {
        let gap = random(400, 500);
        let topY = random(this.ground.y + 100 + gap, this.scene.height / 2 - 100);
        this.topPipe.setPosition(this.scene.width / 2 - this.pool.resetX, topY);
        this.bottomPipe.setPosition(this.scene.width / 2 - this.pool.resetX, topY - gap);
    }

    update(deltaTime: number) {
        if (!this.pool.canScroll) return;
        this.topPipe.setPosition(this.topPipe.position.x + this.pool.speed * deltaTime, this.topPipe.position.y);
        this.bottomPipe.setPosition(this.bottomPipe.position.x + this.pool.speed * deltaTime, this.bottomPipe.position.y);
        if (!this.isPassed && this.topPipe.position.x < this.pool.resetX) {
            this.isPassed = true;
            this.menu.addScore();
        }
        if (this.topPipe.position.x < - this.scene.width / 2 + this.pool.resetX) {
            this.pool.addPipe();
            this.destroy();
        }
    }

}


