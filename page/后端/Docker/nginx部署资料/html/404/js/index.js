var scene = document.getElementById('scene');
var parallax = new Parallax(scene);

function goBack() {
    /**
     * 前进:history.forward();或者history.go(1);
     * 后退: history.back (); 或者history.go(-1);
     */
    // window.history.go(-1); //返回上一页
    // window.history.back();  //返回上一页
    // location.reload(); //强行刷新(返回上一页刷新页面)
    // 有上一页则返回
    // if (window?.history?.state?.back) {
    //     window.history.go(-1);
    // } else {
    //     window.location.href = '/web';
    // }
    window.location.href = '/web';
}
