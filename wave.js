
import { Point } from './point.js';

export class Wave {

    constructor(index, totalPoints, color) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;

        this.pointGap = this.stageWidth / (this.totalPoints - 1);

        this.init();
    }

    init() {
        this.points = [];
        for (let i = 0; i < this.totalPoints; i++) {
            // index, x좌표, y좌표
            const point = new Point(this.index + i, this.pointGap * i, this.centerY);
            this.points[i] = point;
        }
        // 첫번째 점은 x좌표가 0, 마지막 점은 x좌표가 stageWidth
    }

    draw(ctx) {

        // 점 하나를 그려보자.
        ctx.beginPath();
        ctx.fillStyle = this.color;
        
        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);
        for (let i = 1; i < this.totalPoints; i++) {
            // 첫 점과 끝점은 update하지 않음.
            if (i < this.totalPoints - 1) {
                this.points[i].update();
            }

            // point와 point의 중간지점
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            //ctx.lineTo(cx, cy);
            ctx.quadraticCurveTo(prevX, prevY, cx, cy);
            // control point x, control point y, end point x, end point y
            // https://developer.mozilla.org/ko/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo 

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        ctx.lineTo(prevX, prevY); // wave의 맨 끝점으로 선을 연결 
        ctx.lineTo(this.stageWidth, this.stageHeight); // 우측하단으로 연결
        ctx.lineTo(this.points[0].x, this.stageHeight) // 좌측하단으로 연결
        ctx.fill();

        ctx.closePath();
                                          // 채워줍시다.

    }

}