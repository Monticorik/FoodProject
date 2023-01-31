function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // tabs

    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);
          
    function hideTabContent() {
        tabsContent.forEach(elem => {
            elem.classList.add('hide');
            elem.classList.remove('show', 'fade');
        });

        tabs.forEach(elem => {
            elem.classList.remove(activeClass);
        });
    }

    function showTabContent(index = 0) {
        tabsContent[index].classList.remove('hide');
        tabsContent[index].classList.add('show', 'fade');
        tabs[index].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        let target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((elem, index) => {
                if(target == elem){
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });
}

export default tabs;