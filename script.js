let hexPages = document.querySelectorAll('#hexPage')
const colors = {
    'industry': '#2c92f2',
    'export': '#7fb7eb',
    'culture-tour': '#7febc2',
    'prom-potential': '#9b7feb',
    'science-city': '#00C9EF',
    'agro': '#5BCBA4',
    'science-potential': '#00CCCC'
}
hexPages.forEach((elem) => {
    elem.addEventListener('click', function(e) {
        if(this.id == 'hexPage'){
            console.log(this)
            let page = document.getElementById(`${elem.getAttribute('sector')}`)

            page.classList.add('active-page')
            page.style.backgroundColor = `${colors[elem.getAttribute('sector')]}`

            let close = page.querySelector('.hexagon__page-close')
            let text = page.querySelectorAll('.hexagon__text-page')

            text.forEach((el) => {
                el.style.transform = 'translateY(0)'
                el.style.opacity = '100%'
            })
                
            close.addEventListener('click', function(e) {
                page.classList.remove('active-page')
                text.forEach((el) => {
                    el.style.transform = 'translateY(200%)'
                    el.style.opacity = '0'
                })
                e.stopPropagation()
            })
        }
    })
})
