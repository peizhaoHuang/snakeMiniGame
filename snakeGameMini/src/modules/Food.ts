class Food {
    // 获取food元素
    element: HTMLElement;
    constructor() {
        this.element = document.querySelector('.food')!;
    }
    // 获取食物的坐标
    get X() {
        return this.element.offsetLeft;
    }
    get Y() {
        return this.element.offsetTop;
    }
    // 食物随机改变位置函数
    change() {
        let left = Math.floor(Math.random() * 30) * 10;
        let top = Math.floor(Math.random() * 30) * 10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}
export default Food;
