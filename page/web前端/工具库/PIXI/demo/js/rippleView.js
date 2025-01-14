/**
 * PIXIJS涟漪动画
 * @description 生成一个图片的涟漪动画
 * @since 2024-07-10 12:42:37
 * @author Ayo
 *
 * @parentDom {Node} 父容器
 * @bgUrl {String} 图片地址
 * @velocity {Number} 涟漪速度
 * @filterUrl {String} 置换图地址
 *
 * @returns {rippleView}
 *
 * @example
 * const example = new rippleView(playground, bgUrl, 1);
 * example.start();
 */
export default class rippleView {
    constructor(parentDom, bgUrl, velocity, filterUrl) {
        //验证容器是否存在且是否为dom
        if (!parentDom || !parentDom.nodeType) {
            throw new Error('父容器不符合规范(不存在或不是dom)');
        }

        //验证bgUrl是否为图片
        if (!bgUrl || !/(\.jpg|\.jpeg|\.png|\.gif)$/i.test(bgUrl)) {
            throw new Error('图片对象不存在');
        }

        //父容器
        this.parentDom = parentDom;
        //背景图
        this.bgUrl = bgUrl || '';
        //水波图
        this.filterUrl = filterUrl || './img/texture.jpg';
        //是否在进行水波渲染
        this.isPlay = false;
        // 创建一个 Pixi应用
        this.app = new PIXI.Application();
        //canvas对象
        this.canvasDom;
        // 图片精灵
        this.preview;
        // 置换图精灵
        this.displacementSprite;
        // 滤镜
        this.displacementFilter;
        // 舞台（一个容器），这里面包括了图片精灵、置换图精灵
        this.stage;
        //配置
        this.option = {
            width: parentDom.clientWidth,
            height: parentDom.clientHeight,
            transparent: true,
            backgroundColor: 0x000000,
        };

        // 置换图精灵的移动速度
        this.velocity = velocity || 1;
        // raf 是调用 requestAnimationFrame方法的返回值，停止动画效果时需要用到
        // var raf;
        /* 执行的动画函数 => 暴露出来方便移除 */
        this.tickerFunction;

        //初始化
        // this.init();

        //防止animate方法丢失上下文指向
        this.animate = this.animate.bind(this);

        //计时器对象
        this.timer = null;
        //监听器对象
        this.observe = null;
    }
    /* 初始化 */
    async start() {
        await this.app.init(this.option);
        this.canvasDom = this.app.canvas;
        //加载图片资源
        PIXI.Assets.addBundle('resource', {
            bg: this.bgUrl,
            filter: this.filterUrl,
        });
        // const assets = await Assets.loadBundle('animals');
        await PIXI.Assets.loadBundle('resource');
        this.setScene();
        //容器尺寸监听
        this.resize();
    }
    /* 开始执行 */
    setScene() {
        // 把 Pixi 创建的 canvas 添加到页面上
        this.parentDom.appendChild(this.canvasDom);

        // 创建一个容器
        this.stage = new PIXI.Container();

        /* 背景图加载 设置 */
        const texture = PIXI.Sprite.from(this.bgUrl);
        this.preview = new PIXI.Sprite(texture);
        this.preview.x = 0;
        this.preview.y = 0;

        /* 设置容器缩放 => 让背景图等比缩放 */
        this.setScale();

        /* 处理纹理 */
        this.displacementSprite = PIXI.Sprite.from(this.filterUrl);

        // 设置置换图精灵为平铺模式
        this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.MIRRORED_REPEAT;
        // 创建一个置换滤镜
        this.displacementFilter = new PIXI.DisplacementFilter(this.displacementSprite);

        // 添加 图片精灵 到舞台
        this.stage.addChild(this.preview);
        // 添加 置换图精灵 到舞台
        this.stage.addChild(this.displacementSprite);

        // 把 stage 添加到根容器上
        this.app.stage.addChild(this.stage);
        /* 播放 */
        this.playRipple();
    }
    /* 设置容器缩放 => 让背景图等比缩放 */
    setScale(resizeApp = false) {
        //是否要充值canvas尺寸
        if (resizeApp) {
            this.app.renderer.resize(this.parentDom.clientWidth, this.parentDom.clientHeight);
        }
        const scale = Math.max(
            this.app.view.width / this.preview.width,
            this.app.view.height / this.preview.height
        );
        this.stage.scale = scale;
    }
    /* 监听窗口尺寸变化 */
    resize() {
        let that = this;
        // 配置观察器
        const config = { attributes: true, childList: true, subtree: true };
        // 启动观察器
        this.observe = new ResizeObserver((mutation, ob) => {
            that.timer && clearTimeout(that.timer) && (that.timer = null);
            that.timer = setTimeout(() => {
                that.setScale(true);
                that.timer = null;
            }, 300);

            // console.log(mutation);
            // console.log(this.observe);
        });
        // 启动观察器
        this.observe.observe(this.parentDom, config);
    }
    /* 执行的动画函数 */
    animate() {
        let that = this;
        /* 方法一 */
        this.tickerFunction = requestAnimationFrame(that.animate);
        // 改变置换图精灵的位置
        this.displacementSprite.x += this.velocity;
        this.displacementSprite.y += this.velocity;
        /* 方法二会导致涟漪 暂停 重新开始 会变得比上一次快 */
        // this.tickerFunction = this.app.ticker.add(() => {
        //     // 改变置换图精灵的位置 => 加减随意，用来控制方向的
        //     /**/
        //     // this.displacementSprite.x += this.velocity;
        //     // this.displacementSprite.y -= this.velocity;
        //     /**/
        //     // this.displacementSprite.x -= this.velocity;
        //     // this.displacementSprite.y -= this.velocity;
        //     /**/
        //     this.displacementSprite.x += this.velocity;
        //     this.displacementSprite.y += this.velocity;
        //     /**/
        //     // this.displacementSprite.x -= this.velocity;
        //     // this.displacementSprite.y += this.velocity;
        //     // 可以在这里修改置换滤镜的一些属性，例如 `displacementFilter.scale.x` 和 `displacementFilter.scale.y`
        // });
    }

    //播放涟漪
    playRipple() {
        if (!this.isPlay) {
            this.isPlay = true;
            // 设置舞台的滤镜
            this.stage.filters = [this.displacementFilter];
            // // 改变置换图精灵的位置
            // displacementSprite.x += velocity;
            // displacementSprite.y += velocity;
            // 开始动画
            this.animate();
        }
    }

    //停止涟漪
    stopRipple() {
        this.isPlay = false;
        this.displacementSprite.x = 0;
        this.displacementSprite.y = 0;
        // 取消滤镜
        this.stage.filters = [];
        // 停止动画
        cancelAnimationFrame(this.tickerFunction);
        // this.app.ticker.remove(this.tickerFunction);
    }

    destroyed() {
        //停止涟漪
        this.stopRipple();
        //
        this.stage.destroy();
        this.app.destroy();
        //移除canvas容器
        this.parentDom.removeChild(this.canvasDom);
        //移除尺寸监听
        this.observe.unobserve();
        this.observe = null;
    }
}
