//slick slider
$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        //adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/arrow_prev.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/arrow_next.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: false,
                    arrows: false
                }
            }
        ]
      });
});  