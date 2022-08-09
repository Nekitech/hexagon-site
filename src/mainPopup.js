let hexPages = document.querySelectorAll('#hexPage')
const colors = {
    'industry': '#2c92f2',
    'export': '#7fb7eb',
    'culture-tour': '#7febc2',
    'science-city': '#00C9EF',
    'agro': '#5BCBA4',
    'science-potential': '#00CCCC'
}
hexPages.forEach((elem) => {
    elem.addEventListener('click', function(e) {
        if(this.id == 'hexPage'){
            let page = document.getElementById(`${elem.getAttribute('sector')}`)
            page.classList.add('active-page')
            page.style.backgroundColor = `${colors[elem.getAttribute('sector')]}`
            setTimeout(() => [
                page.style.backgroundColor = '#000a19'
            ], 500)
            let close = page.querySelector('.hexagon__page-close')
            let blocksAnima = page.querySelectorAll('.anima-ascent')
            close.style.display = 'block'
            blocksAnima.forEach((el) => {
                el.style.transform = 'translateY(0px)'
                el.style.opacity = '100%'
            })
                
            close.addEventListener('click', function(e) {
                page.classList.remove('active-page')
                blocksAnima.forEach((el) => {
                    el.style.transform = 'translateY(300%)'
                    el.style.opacity = '0'
                })
                close.style.display = 'none'
                e.stopPropagation()
            })
        }
    })
})