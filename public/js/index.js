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
// JS for dashboard.ejs
let entryForm = document.getElementById('submitModal')
let openButton = document.getElementById('openButton')
let addButton = document.getElementById('addButton')
let resetButton = document.getElementById('resetButton')
let resetForm = document.getElementById('resetModal')

resetButton.onclick = function () {
   resetForm.style.display = 'block'
}
openButton.onclick = function () {
   entryForm.style.display = 'block'
}
addButton.onclick = function () {
   entryForm.style.display = 'none'
}
window.onclick = function (event) {
   if (event.target == entryForm || event.target == resetForm) {
      entryForm.style.display = 'none'
      resetForm.style.display = 'none '
   }
}
