window.$vw_base = 375;//默认
window.vw = function vw($px) {
    console.log(($px / $vw_base) * 100 +"vw");
    return ($px / $vw_base) * 100 +"vw";
}
window.reset_vw_base = function vw($px) {
    window.$vw_base = $px;
}