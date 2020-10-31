
export class Point {

    // wave는 point의 집합이 될 것임.
    constructor(index, x, y) {  
        // 초기 설정값
        this.x = x;
        this.y = y;

        // y의 진동 중심값
        this.fixedY = y;
        // 매 프레임마다 위아래로 몇 px씩 움직일 것인가?
        this.speed = 0.01;                      
        // 현재 point가 wave의 몇 번째인가?
        this.cur = index;                          
        // 진폭 : 위아래로 얼마 만큼 움직일 것인가에 대한 max값 (150 ~ 250 사이)
        this.max = Math.random() * 100 + 150;  
    }

    update() {
        this.cur += this.speed;
        this.y = this.fixedY + (Math.sin(this.cur) * this.max)
    }

}