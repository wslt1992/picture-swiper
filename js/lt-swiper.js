class ltSwiper{
    constructor(){
        this.init();
    }

    init(){

        this._this= this;
        this.swiper_button_next = $(".lt-swiper-button-next");
        this.swiper_button_prev = $(".lt-swiper-button-prev");


        this.rootSwiper = $(".lt-swiper-container");
        this.swiper_wrapper = $(".lt-swiper-wrapper");

        this.imgs = $(".lt-swiper-wrapper img");

        this.lt_swiper_show_image = $(".lt-swiper-show-image");

        
        this.currindex = 0;

        this.fumax = -32768;
        this.zhengmax = -32768;
        this.initView();
        this.initOn();
        this.jisuanSwiper_wrapperWidth();
    }
    /**
     * 设置默认的显示的图片
     */
    initView(){
        this.showImage(this.imgs[0].src);
    }
    initOn(){
        // this.swiper_button_next.on('click');
        let self = this;
        this.swiper_button_prev.on('click',this.leftSlide.bind(this));
        this.swiper_button_next.on('click',this.rightSlide.bind(this));

        this.imgs.click((a,b,c)=>{
            let src = a.target.currentSrc;
            this.imgSelected(a.target);
            this.showImage(src);
        })
    }
    imgSelected(element){
        $(element).addClass("selected").siblings().removeClass("selected");
    }
    /**
     * 
     * @param {显示被查看图片的地址} src 
     */
    showImage(src){
        this.lt_swiper_show_image.css({'background-image':`url(${src})`});
    }
    //计算图片包裹容器宽swiper_wrapper
    jisuanSwiper_wrapperWidth(){
        let self = this;
        let oneImg = $(this.imgs[0]);
        let length = this.imgs.length;
        let oneWidth=oneImg.outerWidth();
        let oneMargin =  parseInt(oneImg.css('marginLeft'));
        let totalWidth = oneWidth*length+oneMargin*2*length;

        //最大负max
        let  rootSwiperWidth=this.rootSwiper.innerWidth();
         this.fumax = rootSwiperWidth-totalWidth;
        //最大max
         this.zhengmax = 0;
    }
    //1.左滑动
    leftSlide() {
       
        this.qiehuanyiping('+')
    }
    rightSlide() {
        
        this.qiehuanyiping('-')
    }
    //计算边界
    qiehuanyiping(fuhao){
        
        let  rootSwiperWidth= this.rootSwiper.innerWidth();
        let margin_left = parseInt(this.swiper_wrapper.css('marginLeft'));
        if(fuhao==='-'){
            margin_left -= rootSwiperWidth;
            this.currindex -=1;
        }else if(fuhao==='+'){
            margin_left += rootSwiperWidth;
            this.currindex +=1;
        }

        margin_left = this.jisuanbianjie(margin_left);
        
        this.swiper_wrapper.css({"margin-left":margin_left+"px"})
        console.log("leftSlide");
        //2.index-1  显示出来
        
    }
    jisuanbianjie(margin_left){
        let num=-32768;
        if(margin_left<this.fumax){
            num =  this.fumax;
        }else if(margin_left>this.zhengmax){
            num = this.zhengmax;
        }else{
            num = margin_left;
        }
        return num;
    }
    //2.右滑动
    //3.鼠标滑动事件监听
}

export {ltSwiper};