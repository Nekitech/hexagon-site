let popupNav = document.querySelectorAll('.startSlide__block')
popupNav.forEach((elem) => {
    elem.addEventListener('click', function (e) {
        let popup = document.querySelector(`[popup=${this.id}]`)
        popup.classList.add('active-page')
        let close = popup.querySelector('.hexagon__page-close')
        close.style.display = 'block'
            
        close.addEventListener('click', function(e) {
            popup.classList.remove('active-page')
            close.style.display = 'none'
            e.stopPropagation()
        })
    })
})