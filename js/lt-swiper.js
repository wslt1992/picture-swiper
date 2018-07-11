
class ltSwiper {
    constructor() {
        this.init();
    }

    init() {

        this._this = this;
        this.swiper_button_next = $(".lt-swiper-button-next");
        this.swiper_button_prev = $(".lt-swiper-button-prev");

        this.swiper_img_next = $(".lt-swiper-img-next");
        this.swiper_img_prev = $(".lt-swiper-img-prev");


        this.rootSwiper = $(".lt-swiper-container");
        this.baoguo = $(".baoguo");
        this.swiper_wrapper = $(".lt-swiper-wrapper");

        this.imgs = $(".lt-swiper-wrapper img");

        this.lt_swiper_show_image = $(".lt-swiper-show-image img");

        this.rootBaoguoWidth = -1;
        this.currindex = 0;
        this.currPosition = 0;
        this.fumax = -32768;
        this.zhengmax = -32768;
        this.initView();
        this.initOn();
        this.jisuanSwiper_wrapperWidth();
    }
    /**
     * 设置默认的显示的图片
     */
    initView() {
        this.showImage(this.imgs[0].src);
    }
    initOn() {
        // this.swiper_button_next.on('click');
        let self = this;
        this.swiper_button_prev.on('click', this.leftSlide.bind(this));
        this.swiper_button_next.on('click', this.rightSlide.bind(this));

        
        this.swiper_img_prev.on('click', this.leftSlideOneImg.bind(this));
        this.swiper_img_next.on('click', this.rightSlideOneImg.bind(this));


        this.imgs.click((a) => {
            let src = $(a.currentTarget).attr("src");

            this.imgSelected(a.target);
            this.showImage(src);

            this.currindex  =$(a.target).index();
        })
    }
    imgSelected(element) {
        $(element).addClass("selected").siblings().removeClass("selected");
    }
    leftSlideOneImg(){
        let index = this.currindex;
        index--;
        if(index<0){
            index=0;
        }

        this.showImage(this.imgs[index].src);
        this.imgSelected(this.imgs[index]);
        this.currindex = index;

        //相对于父的偏移
        let position = $(this.imgs[index]).position();
        let currPosition = this.currPosition;
        //offsetParent - currPosition，但是currPosition为负数，所以取绝对值
        

        //当前显示的区域左和右边的坐标
        let you = Math.abs(currPosition)+this.rootBaoguoWidth
        let zuo = Math.abs(currPosition);
        if(position.left<=zuo){
            this.leftSlide();
        }
        // else if(position.left>=you){
        //     this.rightSlide();
        // }
        
    }

    rightSlideOneImg(){
        let index = this.currindex;
        index++;
        if(index>this.imgs.length-1){
            index=this.imgs.length-1;
        }

        this.showImage(this.imgs[index].src);
        this.imgSelected(this.imgs[index]);
       
        this.currindex = index;

        let position = $(this.imgs[index]).position();
        let currPosition = this.currPosition;
        //offsetParent - currPosition，但是currPosition为负数，所以取绝对值
        

        let you = Math.abs(currPosition)+this.rootBaoguoWidth
        let zuo = Math.abs(currPosition);
        // if(position.left<=zuo){
        //     this.leftSlide();
        // }else 
        if(position.left>=you){
            this.rightSlide();
        }
    }

    /**
     * 
     * @param {显示被查看图片的地址} src 
     */
    showImage(src) {
        // this.lt_swiper_show_image.css({
        //     'background-image': `url(${src})`
        // });
        this.lt_swiper_show_image.attr("src",src)
    }
    //计算图片包裹容器宽swiper_wrapper
    jisuanSwiper_wrapperWidth() {
        let self = this;
        let oneImg = $(this.imgs[0]);
        let length = this.imgs.length;
        let oneWidth = oneImg.outerWidth();
        let oneMargin = parseInt(oneImg.css('marginLeft'));
        let totalWidth = oneWidth * length + oneMargin * 2 * length;

        //最大负max
        this.rootBaoguoWidth = this.baoguo.innerWidth();
        this.fumax = this.rootBaoguoWidth - totalWidth;
        //最大max
        this.zhengmax = 0;
    }
    //1.左滑动
    leftSlide() {

        this.moveOneBundle('+')
    }
    rightSlide() {

        this.moveOneBundle('-')
    }
    //计算边界
    
    /**
     * 切换一批
     * 需要移动左边距来控制滑动
     * @param {判断左右切换} fuhao 
     */
    moveOneBundle(fuhao) {

        let rootSwiperWidth = this.baoguo.innerWidth();
        // let  rootSwiperWidth= this.baoguo.innerWidth()+parseInt(this.baoguo.css("marginLeft"))*2;
        // let margin_left = parseInt(this.swiper_wrapper.css('marginLeft'));
        if (fuhao === '-') {
            this.currPosition -= rootSwiperWidth;
        } else if (fuhao === '+') {
            this.currPosition += rootSwiperWidth;
        }

        this.currPosition = this.checkBoundaries(this.currPosition);
        
        //切换动画
        this.qiepingdonghua();

    }
    /**
     * 切屏动画
     */
    qiepingdonghua(){
        let ieNum = this.IEVersion();
        if(ieNum!=(-1)&&ieNum<10){
            this.swiper_wrapper.animate({
                "margin-left": this.currPosition + "px"
            },"normal",'linear')
        }
       
        else{
        this.swiper_wrapper.css({
                    "margin-left": this.currPosition + "px"
                })
        }
        
        //2.index-1  显示出来
    }

    /**
     * 检测左边界是否区间内，不在则设置为最小或者最大
     * @param {} margin_left 
     */
    checkBoundaries(margin_left) {
        let num = -32768;
        if (margin_left < this.fumax) {
            num = this.fumax;
        } else if (margin_left > this.zhengmax) {
            num = this.zhengmax;
        } else {
            num = margin_left;
        }
        return num;
    }
    //2.右滑动
    //3.鼠标滑动事件监听

    /**
     * IE检查
     */
    IEVersion() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7) {
                return 7;
            } else if(fIEVersion == 8) {
                return 8;
            } else if(fIEVersion == 9) {
                return 9;
            } else if(fIEVersion == 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }   
        } else if(isEdge) {
            return 'edge';//edge
        } else if(isIE11) {
            return 11; //IE11  
        }else{
            return -1;//不是ie浏览器
        }
    }
}

export {
    ltSwiper
};
$.fn.extend({"ltSwiper":ltSwiper});