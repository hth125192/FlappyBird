import { _decorator, Animation, AudioClip, AudioSource, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Start')
export class Start extends Component {
    
    @property ({ type: Node })
    public maskLayer: Node = null;

    @property ({ type: AudioClip })
    public swooshingAudio: AudioClip = null;

    startGame() {
        let audioSource = this.node.addComponent(AudioSource);
        audioSource.clip = this.swooshingAudio;
        audioSource.play();

        this.maskLayer.getComponent(Animation).play();

        this.scheduleOnce(() => {
            director.loadScene('game');
        }, 1);
    }

}


