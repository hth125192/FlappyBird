import { _decorator, Animation, Button, CCInteger, Component, Label, Node } from 'cc';
import { AudioController } from './AudioController';

const { ccclass, property } = _decorator;

@ccclass('Menu')
export class Menu extends Component {

    @property ({ type: CCInteger })
    public goldScore: number = 30;

    @property ({ type: CCInteger })
    public silverScore: number = 10;

    @property ({ type: Label })
    public currentScore: Label;
    
    @property ({ type: Node })
    public getReady: Node;

    @property ({ type: Node })
    public tapToPlay: Node;

    @property ({ type: Node })
    public gameOver: Node;

    @property ({ type: Node })
    public resultBoard: Node;

    @property ({ type: Node })
    public medalSilver: Node;

    @property ({ type: Node })
    public medalGold: Node;

    @property ({ type: Label })
    public resultScore: Label;

    @property ({ type: Label })
    public bestScore: Label;

    @property ({ type: Button })
    public restart: Button;

    @property ({ type: Node })
    public splashLayer: Node;

    @property ({ type: AudioController })
    public audioController: AudioController;

    private score: number;

    updateScore(num: number) {
        this.score = num;
        this.currentScore.string = num.toString();
    }

    addScore() {
        this.audioController.onAudioQueue(2);
        this.updateScore(this.score + 1);
    }

    resetScore() {
        this.updateScore(0);
    }

    showReady() {
        this.gameOver.active = false;
        this.resultBoard.active = false;
        this.restart.node.active = false;
    }

    hideReady() {
        this.getReady.getComponent(Animation).play();
        this.tapToPlay.getComponent(Animation).play();
    }
    
    showResult() {
        this.resultScore.string = this.score.toString();

        let best = localStorage.getItem('bestScore');
        if (best === null || this.score > parseInt(best)) {
            localStorage.setItem('bestScore', this.score.toString());
        }
        this.bestScore.string = localStorage.getItem('bestScore');
        
        this.splashLayer.getComponent(Animation).play();
        this.currentScore.node.active = false;

        this.scheduleOnce(() => {
            this.gameOver.active = true;
            this.audioController.onAudioQueue(0);
            this.gameOver.getComponent(Animation).play();
        }, 0.5);

        this.scheduleOnce(() => {
            this.resultBoard.active = true;
            if (this.score < this.goldScore) {
                this.medalGold.active = false;
                if (this.score < this.silverScore) {
                    this.medalSilver.active = false;
                }
            }
            this.audioController.onAudioQueue(0);
            this.resultBoard.getComponent(Animation).play();
        }, 1.2);

        this.scheduleOnce(() => {
            this.restart.node.active = true;
            this.audioController.onAudioQueue(0);
            this.restart.getComponent(Animation).play();
        }, 2);
    }
    
}


