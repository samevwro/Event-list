
const tableContainer = document.getElementById("tableInput")
var dbJsonSize = 0

async function onLoadAddTableData() {
    const URL = "http://localhost:3000/Events"

    fetch(URL)
    .then(function(response){
        return response.json()
    })
    .then(function(message){
        tableContainer.innerHTML = ""
        for(let i = 0; i < Object.keys(message).length; i++){
            const newRow = document.createElement("tr")
            newRow.id = `row${i}`
            newRow.className = "text-bg-secondary p-3"
            tableContainer.appendChild(newRow)
            const appendedRow = document.getElementById(`row${i}`)
            dbJsonSize =+ 1
            let eventHTML = `<td>${message[i].Event}</td>
                <td>${message[i].StartDate}</td>
                <td>${message[i].EndDate}</td>
                <td>${message[i].Notes}</td>
                <td><button onclick="deleteEventBtn(${i})" type="button" class="btn btn-danger" id="deleteBtn${i}">Delete</button></td>`
            appendedRow.insertAdjacentHTML('beforeend', eventHTML)
        }
    })
}
onLoadAddTableData()

async function onCreateEventClick(){
    const eventValue = document.getElementById('eventInput').value
    const notesValue = document.getElementById("notesInput").value
    const startDateValue = document.getElementById("startDate").value
    const endDateValue = document.getElementById("endDate").value
    const JsonValues = { id: ""+dbJsonSize, Event: ""+eventValue, StartDate: ""+startDateValue, EndDate: ""+endDateValue, Notes: ""+notesValue }
    dbJsonSize =+ 1
    const response = await fetch("http://localhost:3000/Events", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(JsonValues)
    })
    eventValue.innerHTML = ""
    onLoadAddTableData()
    const newlyCreatedEvent = await response.json()
}

async function deleteEventBtn(id){
    const deleteBtn = document.getElementById(`row${id}`)
    console.log(id)
    await fetch(`http://localhost:3000/Events/${(id)}`,{
        method: "DELETE"
    })
    onLoadAddTableData()
}