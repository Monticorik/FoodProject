function tabs() {
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
}

module.exports = tabs;