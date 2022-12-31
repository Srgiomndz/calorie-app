// JS for profile.ejs
let modal = document.getElementById('my-modal')
let btn = document.getElementById('open-btn')
let button = document.getElementById('ok-btn')

btn.onclick = function () {
   modal.style.display = 'block'
}
button.onclick = function () {
   modal.style.display = 'none'
}
window.onclick = function (event) {
   if (event.target == modal) {
      modal.style.display = 'none'
   }
}
