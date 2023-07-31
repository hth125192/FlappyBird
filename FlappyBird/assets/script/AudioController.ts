import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {

    @property ({ type: [AudioClip] })
    public clips: AudioClip[] = [];

    @property ({ type: AudioSource })
    public audioSource: AudioSource = null;

    onAudioQueue(index: number) {
        this.audioSource.playOneShot(this.clips[index]);
    }

}


