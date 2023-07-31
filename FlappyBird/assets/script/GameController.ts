import { _decorator, Animation, Collider2D, Component, Contact2DType, director, Node } from 'cc';
import { PipePool } from './PipePool';
import { Ground } from './Ground';
import { Bird } from './Bird';
import { Menu } from './Menu';
import { AudioController } from './AudioController';

const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property ({ type: PipePool })
    public pipeQueue: PipePool;

    @property ({ type: Ground })
    public ground: Ground;

    @property ({ type: Bird })
    public bird: Bird;

    @property ({ type: Menu })
    public menu: Menu;

    @property ({ type: Node })
    public maskLayer: Node;

    @property ({ type: AudioController })
    public audioController: AudioController;

    private collider: Collider2D;
    private isStart: boolean;
    private isOver: boolean;

    onLoad() {
        this.initListener();
        this.menu.showReady();
        this.menu.resetScore();
        this.collider = this.bird.getComponent(Collider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.isStart = true;
        this.isOver = false;
    }

    onDestroy() {
        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    initListener() {
        this.node.on(Node.EventType.TOUCH_START, () => {
            if (this.isStart) {
                this.startGame();
                this.isStart = false;
            }
            if (!this.isOver) {
                this.bird.fly();
                this.audioController.onAudioQueue(1);
            }
        });
    }

    startGame() {
        this.menu.hideReady();
        this.pipeQueue.startScroll();
    }

    gameOver() {
        this.menu.showResult();
        this.ground.stopScroll();
        this.pipeQueue.stopScroll();
        this.isOver = true;
    }

    restartGame() {
        this.audioController.onAudioQueue(0);

        this.maskLayer.active = true;
        this.maskLayer.getComponent(Animation).play();

        this.scheduleOnce(() => {
            director.loadScene('game');
        }, 1);
    }

    onBeginContact() {
        if (this.bird.hitSomething) return;
        this.audioController.onAudioQueue(3);
        this.bird.hitSomething = true;
    }

    birdStruck() {
        if (this.bird.hitSomething) this.gameOver();
    }

    update() {
        if (this.isOver) return;
        this.birdStruck();
    }

}


