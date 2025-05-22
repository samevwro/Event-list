
const tableContainer = document.getElementById("tableInput")


async function onLoadAddTableData() {
    const URL = "http://localhost:3000/Events"

    fetch(URL)
    .then(function(response){
        return response.json()
    })
    .then(function(message){
        for(let i = 0; i < Object.keys(message).length; i++){
            const newRow = document.createElement("tr")
            newRow.id = `row${i}`
            newRow.className = "text-bg-secondary p-3"
            tableContainer.appendChild(newRow)
            const appendedRow = document.getElementById(`row${i}`)
            let eventHTML = `<td>${message[i].Event}</td>
                <td>${message[i].StartDate}</td>
                <td>${message[i].EndDate}</td>
                <td>${message[i].Notes}</td>
                <td><button type="button" class="btn btn-danger" id="deleteBtn${i}">Delete</button></td>`
            appendedRow.insertAdjacentHTML('beforeend', eventHTML)
        }
    })
}
onLoadAddTableData()

function deleteBtn(id) {
    let row = id
    
}