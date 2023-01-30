function modal() {
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
}

module.exports = modal;