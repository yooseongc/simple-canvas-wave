
import { WaveGroup } from './wavegroup.js';

// ref: https://www.youtube.com/watch?v=LLfhY4eVwDY&t=28s

class App {

    constructor() {
        console.log('initialize app!');
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);


        // create wave!
        this.waveGroup = new WaveGroup();

        // resize event binding
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        // canvas를 더블사이즈(화면 1px당 canvas는 2px)로 해서 고해상도를 만들어주자.
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;

        // 모든 xy좌표를 2배 뻥튀기해서 적용.
        // https://zetawiki.com/wiki/HTML5_%EC%BA%94%EB%B2%84%EC%8A%A4_scale()
        this.ctx.scale(2, 2);

        this.waveGroup.resize(this.stageWidth, this.stageHeight);
        
    }

    animate(t) {
        // 프레임마다 화면을 청소
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.waveGroup.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }

}

window.onload = () => {
    new App();
}