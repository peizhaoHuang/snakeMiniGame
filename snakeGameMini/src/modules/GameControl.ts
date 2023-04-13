import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
// 游戏控制类
class GameControl {
    food: Food;
    snake: Snake;
    scorePanel: ScorePanel;
    maxHistoryEle: HTMLElement;
    // 用来存储蛇的移动方向
    direction: string = '';
    // 控制游戏开始和结束
    isLive: boolean = true;
    constructor() {
        this.maxHistoryEle = document.querySelector('#max')!;
        // 实例化
        this.food = new Food();
        this.snake = new Snake();
        // 传参第一个是最高等级，第二个是每多少分升一级
        this.scorePanel = new ScorePanel(10,5);
        // 游戏启动
        this.init();
    }
    // 初始化游戏
    init() {
        // 禁止浏览器窗口滑动
        // passive 参数不能省略 用来兼容ios和android
        document.body.addEventListener('keydown', function(e){
            e.preventDefault();
        }, { passive: false });
        // 全局监听键盘按下 bind绑定this
        document.addEventListener('keydown',this.keydownHandle.bind(this));
        // 把记录渲染到游戏页面
        console.log('nihda')
        // 判断一下是否存到记录
        if ( !localStorage.getItem('maxScore')) {
            this.maxHistoryEle.innerHTML = this.scorePanel.maxHistory + '';
        } else {
            this.maxHistoryEle.innerHTML = localStorage.getItem('maxScore') + '';
        }
        // 让蛇动起来
        this.run();
    }
    // 获取按键事件并存储方向
    keydownHandle(event:KeyboardEvent) {
        this.direction = event.key;
    }
    // 控制蛇的移动
    run() {
        // 获取蛇的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;
        // 控制方向键进行移动
        switch(this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                X += 10;
                break;
        }
        // 检查是否吃到食物
        this.checkFood(X,Y);
        try {
            // 更蛇的坐标
            this.snake.X = X;
            this.snake.Y = Y;
        } catch(event: any) {
            // 捕获撞墙
            alert(event.message + 'Game Over!');
            this.isLive = false;
        }
        this.isLive && setTimeout(() => {
           this.run(); 
        }, 300 - (this.scorePanel.level - 1) * 30);
    }
    // 用于检测蛇进食，控制食物的位置
    checkFood(X:number,Y:number) {
        // 判断坐标是否与食物坐标重合
        if (X === this.food.X && Y === this.food.Y) {
            // 改变食物位置
            this.food.change();
            // 改变分数
            this.scorePanel.scoreChange();
            // 身体自增1
            this.snake.addBodies();
        }
    }
    
    
}
export default GameControl;
