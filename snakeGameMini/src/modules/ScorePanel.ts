class ScorePanel {
    // 分数
    score = 0;
    // 等级
    level = 1;
    // 历史最高得分
    maxHistory = 0;
    // 最终得分
    scoreEnd = 0;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    // maxHistoryEle: HTMLElement;
    // 设置升级条件，每10分一级
    maxLevelScore:number;
    // 设置最大等级，默认10级
    maxLevel: number
    constructor(maxLevelScore:number = 10,maxLevel:number = 2) {
        this.scoreEle = document.querySelector('#score')!;
        this.levelEle = document.querySelector('#level')!;
        // this.maxHistoryEle = document.querySelector('#max')!;
        this.maxLevelScore = maxLevelScore;
        this.maxLevel = maxLevel;

    }
    // 分数自增
    scoreChange() {
        let newScore = ++this.score;
        this.scoreEnd = newScore;
        this.scoreEle.innerHTML = newScore + '';
        if (this.score % this.maxLevel == 0) {
            this.levelChange();
        }
        this.maxHistoryScore()
    }
    // 升级
    levelChange() {
        if (this.level < this.maxLevelScore) {
            this.levelEle.innerHTML = ++this.level + '';
        }
    }
    // 历史最高分存储
    maxHistoryScore() {
        // 判断有没有maxScore
        if (!localStorage.getItem("maxScore")) {
            localStorage.setItem("maxScore",'1');
        } else if (Number(localStorage.getItem("maxScore")) < this.scoreEnd){
            localStorage.setItem("maxScore",JSON.stringify(this.scoreEnd));
        }
    }
}
export default ScorePanel;