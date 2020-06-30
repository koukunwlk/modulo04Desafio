const modalOverlay = document.querySelector(".modal-overlay")
const cards = document.querySelectorAll(".card")



for(let card of cards){
    card.addEventListener("click", function(){
        const videoId = card.getAttribute('id')
        modalOverlay.classList.add("active")
        document.querySelector('iframe').src= `https://rocketseat.com.br/${videoId}`
    })
}

const closeModal = document.querySelector('.close-modal').addEventListener('click', ()=>{
    modalOverlay.classList.remove('active')
    document.querySelector('iframe').src= ""
    document.querySelector('.modal').classList.remove('maximize')


})

/* maximizando a pagina */
const maximize = document.querySelector('.maximize-modal')
const modal = document.querySelector('.modal')

maximize.addEventListener('click', ()=>{
    const isMaximize = modal.classList.contains('maximize')
    if(isMaximize == true){
        document.querySelector('.modal').classList.remove('maximize')
    } else{
        document.querySelector('.modal').classList.add('maximize')
    }
})


