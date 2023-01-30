function slider() {
    //slider

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1,
        offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesWrapper.style.overflow = 'hidden';
    slidesField.style.width = slides.length * 100 + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = 'all 0.5s';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const sliderIndicators = document.createElement('ol'),
          dots = [];

    sliderIndicators.classList.add('carousel-indicators');
    slider.append(sliderIndicators);

    for(let i = 1; i <= slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i);
        dot.classList.add('dot');

        if(i == 1){
            dot.style.opacity = '1';
        }
        sliderIndicators.append(dot);
        dots.push(dot);
    }


    next.addEventListener('click', () => {
        if(offset == +width.slice(0, -2) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += +width.slice(0, -2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        addZero();
        dotHighlight();
    });

    prev.addEventListener('click', () => {
        if(offset == 0){
            offset = +width.slice(0, -2) * (slides.length -1);
        } else {
            offset -= +width.slice(0, -2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addZero();
        dotHighlight();
    });

    sliderIndicators.addEventListener('click', (event) => {
        const dot = event.target;

        if(dot && dot.classList.contains('dot')){
            slideIndex = dot.getAttribute('data-slide-to');
            offset = (slideIndex - 1) * +width.slice(0, -2);

            slidesField.style.transform = `translateX(-${offset}px)`;

            addZero();
            dotHighlight();
        }

    });

    function addZero(){
        if(slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function dotHighlight(){
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }
    

    // function showSlide(count){
    //     if(count > slides.length) slideIndex = 1;
    //     if(count < 1) slideIndex = slides.length;

    //     slides.forEach(img => img.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';

    //     current.textContent = slideIndex < 10 ? '0' + slideIndex: slideIndex; 
    // }


    // function setSlideAmount(){
    //     const totalAmount = slides.length < 10 ? '0' + slides.length: slides.length; 

    //     total.textContent = `${totalAmount}`;
    // }

    // setSlideAmount()
    // showSlide(slideIndex);

    // prev.addEventListener('click', () => {
    //     slideIndex--;
    //     showSlide(slideIndex);
    // });
    // next.addEventListener('click', () => {
    //     slideIndex++;
    //     showSlide(slideIndex);
    // });
}

module.exports = slider;