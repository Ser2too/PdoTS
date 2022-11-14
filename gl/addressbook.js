const addForm = document.getElementById("add")
const nameInput = document.getElementById("name")
const phoneInput = document.getElementById("phone")
const openAdd = document.getElementById("openAdd")
const list = document.getElementById("list")
const btnAdd = document.getElementById("btnAdd")
const btnClose = document.getElementById("btnClose")
const contactsBlock = document.getElementById("contacts")
const search = document.getElementById("search")

let AllContacts = [
    { name: "asd", phone: 123123123, inx: 0, favorite: false },
    { name: "3123123", phone: "asdqw", inx: 1, favorite: true },
    { name: "a321s12d", phone: "as2d123", inx: 2, favorite: false }
]
contactsSort()

function contactsSort() {
    AllContacts = AllContacts.sort(el => !el.favorite)
}

let filteredContacts = null

openAdd.addEventListener('click', (e) => {
    e.preventDefault()
    addForm.style.display = 'block'
    list.style.display = 'none'
})

btnClose.addEventListener('click', (e) => {
    e.preventDefault()
    addForm.style.display = 'none'
    list.style.display = 'block'

    rerenderContacts()
})

btnAdd.addEventListener('click', function(e) {
    e.preventDefault()
    if (nameInput.value !== "" && phoneInput.value !== "") {
        AllContacts.push({
            name: nameInput.value,
            phone: phoneInput.value,
            inx: Math.random(),
            favorite: false
        })
    }
})

function removeContact(inx) {
    AllContacts = AllContacts.filter(el => el.inx != inx)    

    rerenderContacts()
}

function searchHandler() {
    filteredContacts = AllContacts.filter(contact => contact.name.indexOf(search.value) !== -1)
    rerenderContacts()
}

function addFavorite(inx) {
    const el = AllContacts.find(el => el.inx == inx)
    el.favorite = !el.favorite
    contactsSort()
    rerenderContacts()
}



function rerenderContacts() {
    let str = ''
    console.log(AllContacts)
    for (const row of AllContacts) {
        if (filteredContacts !== null && filteredContacts.indexOf(row) == -1) continue

        str += `
        <div class="row border-top border-bottom mb-2" style="margin: 0 auto;">
            <div class="col">
                <h5>${row.name}</h5>
                <span>${row.phone}</span>
            </div>
            <div class="col mt-auto mb-auto">
                <button onclick="removeContact(${row.inx})" class="btn btn-danger">удалить</button>
                <svg class="favorite" onclick="addFavorite(${row.inx})" style="width:20px; " version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 485 485" style="enable-background:new 0 0 485 485;" xml:space="preserve">
                <path fill="${row.favorite ? "red" : "black"}" d="M348.629,11.209c-41.588,0-80.489,19.029-106.129,50.852c-25.641-31.823-64.541-50.852-106.129-50.852
                    C61.176,11.209,0,72.385,0,147.579c0,59.064,35.289,127.458,104.885,203.28c53.64,58.438,111.995,103.687,128.602,116.164
                    l9.01,6.769l9.009-6.768c16.608-12.477,74.964-57.725,128.605-116.162C449.71,275.04,485,206.646,485,147.579
                    C485,72.385,423.824,11.209,348.629,11.209z"/>
                    
                </svg>
            </div>
        </div>
        `
    }
    contactsBlock.innerHTML = str
}


rerenderContacts()