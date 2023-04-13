
class Snake{
    head: HTMLElement;
    element: HTMLElement;
    bodies: HTMLCollection;
    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');
    }
    // 获取头部left距离
    get X() {
        return this.head.offsetLeft;
    }
    // 获取头部top距离
    get Y() {
        return this.head.offsetTop;
    }
    // 设置头部left距离
    set X(value:number) {
        if (this.X === value) {
            return;
        }
        // 撞墙判断
        if (value < 0 || value > 290) {
            window.location.reload();
            throw Error('The snake hit the wall!')
        }
        // 调头判断 身体存在且头部位置与身体位置相同时
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft == value) {
            // 
            if (value > this.X) {
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }
        // 移动身体
        this.moveBodies()
        this.head.style.left =  value + 'px';
        // 检查是否撞到自己
        this.checkHit();
    }
    // 设置头部top距离
    set Y(value:number) {
        if (this.Y === value) {
            return;
        }
        if (value < 0 || value > 290) {
            window.location.reload();
            throw Error('The snake hit the wall!')
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop == value) {
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        // 移动身体
        this.moveBodies()

        this.head.style.top = value + 'px';
        // 检查是否撞到自己
        this.checkHit();
    }
    addBodies() {
        this.element.insertAdjacentHTML('beforeend','<div class="change"></div>');
    }
    // 移动身体，让后一个身体等于前一个身体的位置，这样可以避免身体覆盖
    moveBodies() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    // 检测蛇撞到自己，头部的位置和身体的位置重复
    checkHit() {
        for (let i = 1; i < this.bodies.length; i++) {
            if (this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop) {
                // 重新开始游戏
                window.location.reload();
                throw new Error('The snack hit its bodies!')
            }
        }
    }
}
export default Snake;
