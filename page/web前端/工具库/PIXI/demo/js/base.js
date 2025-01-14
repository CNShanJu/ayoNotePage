import rippleView from './rippleView.js';

const bgUrl = './img/fantasy.jpg';
const filterUrl = './img/texture.jpg';

const playground = document.getElementById('px-render');
let example;
function init() {
    example = new rippleView(playground, bgUrl, 1, filterUrl);
    window.example = example;
    example.start();
}
init();
//绑定点击事件
let start = document.querySelector('.start-btn');
let stop = document.querySelector('.stop-btn');
start.onclick = () => {
    example.playRipple();
};
stop.onclick = () => {
    example.stopRipple();
};
