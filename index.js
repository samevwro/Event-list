
const tableContainer = document.getElementById("tableInput")
var dbJsonSize = 0

try{
    dbIdLength();
}
catch(err){
    throw 'DbIDLenght error'
}


async function dbIdLength() {
    
    await fetch("http://localhost:3000/Events")
    
    .then(function(list){
        return list.json()
    })
    .then(function(items){
        
        dbJsonSize = 0
        
        let lastObjectIndex = items[(Object.keys(items).length)-1].id
        let lastId = parseInt(lastObjectIndex)+1
        
        dbJsonSize =+lastId
        console.log(lastId)
    })
}
async function onLoadAddTableData(list) {
    const URL = "http://localhost:3000/Events"
    fetch(URL)
    .then(function(response){
        return response.json()
    })
    .then(function(message){
        tableContainer.innerHTML = ""
        for(let i = 0; i < Object.keys(message).length; i++){
            const newRow = document.createElement("tr")
            newRow.id = `row${message[i].id}`
            newRow.className = "text-bg-secondary p-3"
            tableContainer.appendChild(newRow)
            const appendedRow = document.getElementById(`row${message[i].id}`)
            let eventHTML = `<td>${message[i].Event}</td>
                <td>${message[i].StartDate}</td>
                <td>${message[i].EndDate}</td>
                <td>${message[i].Notes}</td>
                <td><button onclick="deleteEventBtn(${message[i].id})" type="button" class="btn btn-danger" id="deleteBtn${i}">Delete</button></td>`
            appendedRow.insertAdjacentHTML('beforeend', eventHTML)
            
            
        }}
        
    )
    dbJsonSize += 1
    console.log(dbJsonSize)
}

onLoadAddTableData()


async function onCreateEventClick(){
    const eventValue = document.getElementById('eventInput').value
    const notesValue = document.getElementById("notesInput").value
    const startDateValue = document.getElementById("startDate").value
    const endDateValue = document.getElementById("endDate").value
    
    const JsonValues = { id: ""+dbJsonSize, Event: ""+eventValue, StartDate: ""+startDateValue, EndDate: ""+endDateValue, Notes: ""+notesValue }
    
    const response = await fetch("http://localhost:3000/Events", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(JsonValues)
    })
    document.getElementById('eventInput').value = ''
    document.getElementById("notesInput").value = ''
    document.getElementById("startDate").value = ''
    document.getElementById("endDate").value = ''
    onLoadAddTableData()
    const newlyCreatedEvent = await response.json()
    console.log(dbJsonSize)
}

async function deleteEventBtn(id){
    const deleteBtn = document.getElementById(`row${id}`)
    //document.parentNode.removeChild(deleteBtn)
    await fetch(`http://localhost:3000/Events/${(id)}`,{
        method: "DELETE"
    })
    await onLoadAddTableData()
    console.log(dbJsonSize)
}

