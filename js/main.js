'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
          
    function hideTabContent() {
        tabsContent.forEach(elem => {
            elem.classList.add('hide');
            elem.classList.remove('show', 'fade');
        });

        tabs.forEach(elem => {
            elem.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(index = 0) {
        tabsContent[index].classList.remove('hide');
        tabsContent[index].classList.add('show', 'fade');
        tabs[index].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        let target = event.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((elem, index) => {
                if(target == elem){
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });

    // Timer

    const deadLine = '2023-02-25';

    function getTimeRemaining(endTime) {
        let time = Date.parse(endTime) - Date.parse(new Date()),
            days,
            hours,
            minutes,
            seconds;
            
        if(time < 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(time / (1000 * 60 * 60 * 24));
            hours = Math.floor((time / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((time / (1000 * 60)) % 60);
            seconds = Math.floor((time / 1000) % 60);
        }

        return {
            'total': time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function getZero(number){
        if(number >= 0 && number < 10){
            return '0' + number;
        }

        return '' + number;
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if(t.total < 0){
                clearInterval(timeInterval);
            }
        }


    }

    setClock('.timer', deadLine);

    // modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
          
    function openModal(){
        modal.classList.remove('hide');
        modal.classList.add('show', 'fade');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    
    modalTrigger.forEach(elem => {
        elem.addEventListener('click', () => {
            openModal();
        });
    });

    function showModalByScroll() {
        const doc = document.documentElement;
        if(doc.scrollHeight <= (doc.clientHeight + doc.scrollTop)){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    function closeModal() {
        modal.classList.remove('show', 'fade');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code == 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

    let modalTimerId = setTimeout(openModal, 500000);

    // Menu class

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if(this.classes.length === 0) {
                this.element = 'menu__item'; 
                element.classList.add(this.element);
            } else{
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.append(element);
        }

    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // })

    axios.get('http://localhost:3000/menu')
        .then(data => {
                data.data.forEach(({img, altimg, title, descr, price}) => {
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                });
        });

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const elem = document.createElement('div');

    //         elem.classList.add('menu__item');
    //         elem.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price * 27}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(elem);
    //     })
    // }

    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: "Дякую! Скоро ми з вами зв'яжемося",
        failure: "Щось пішло не так",
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests',json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

        });
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__content');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);

    }

    //slider

    const slides = document.querySelectorAll('.offer__slide'),
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

        if(slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
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

        if(slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });

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

    // carousel indicators

    const slidesMainBlock = document.querySelector('.offer__slider');

    slidesMainBlock.style.position = 'relative';

    function setSlidesIndicator(){
        const wrapper = document.createElement('div');

        wrapper.classList.add('carousel-indicators');

        for(let i = 0; i < slides.length; i++){
            wrapper.innerHTML += `<div data-count = ${i} class="dot"></div>`;
        }

        slidesMainBlock.append(wrapper);

    }

    setSlidesIndicator();

    const slidesIndicator = slidesMainBlock.querySelector('.carousel-indicators');


});