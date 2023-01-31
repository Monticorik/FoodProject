function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show', 'fade');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId){
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('hide');
    modal.classList.add('show', 'fade');
    document.body.style.overflow = 'hidden';

    if(modalTimerId){
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // modal window

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);
    
    modalTrigger.forEach(elem => {
        elem.addEventListener('click', () => {
            openModal(modalSelector, modalTimerId);
        });
    });

    function showModalByScroll() {
        const doc = document.documentElement;
        if(doc.scrollHeight <= (doc.clientHeight + doc.scrollTop)){
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code == 'Escape' && modal.classList.contains('show')){
            closeModal(modalSelector);
        }
    });

}

export default modal;
export {openModal};
export {closeModal};