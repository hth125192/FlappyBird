import { _decorator, Animation, CCFloat, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    
    @property ({ type: CCFloat })
    public jumpHeight: number = 200;

    @property ({ type: CCFloat })
    public jumpDuration: number = 0.3;

    private animation: Animation;
    public hitSomething: boolean;

    onLoad() {
        this.resetBird();
        this.animation = this.getComponent(Animation);
    }

    resetBird() {
        this.node.setPosition(new Vec3(-160, 0, 0));
        this.hitSomething = false;
    }

    fly() {
        this.animation.stop();

        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0), {easing: "smooth",
                onUpdate: (target: Vec3) => {
                    this.node.position = target;
                }
            })
            .start();
    }

}


