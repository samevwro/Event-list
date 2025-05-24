
const tableContainer = document.getElementById("tableInput");
//Using this variable it keeps track of how many objects are in the JSON file
var dbJsonSize = 0;

try{
    dbIdLength();
}
catch(err){
    throw 'DbIDLenght error';
}
//this function is to find the last id in the data base ;
// file so more can be added/deleted if the page has been refreshed ;
async function dbIdLength() {
    await fetch("http://localhost:3000/Events")
    .then(function(list){
        return list.json();
    })
    .then(function(items){
        dbJsonSize = 0;
        let lastObjectIndex = items[(Object.keys(items).length)-1].id;
        let lastId = parseInt(lastObjectIndex)+1;
        dbJsonSize =+lastId;
    });
};
//This function calls to the data base file then creates table rows and date and adds all the data to the table;
async function onLoadAddTableData() {
    const URL = "http://localhost:3000/Events";
    fetch(URL)
    .then(function(response){
        return response.json();
    })
    .then(function(message){
        tableContainer.innerHTML = "";
        for(let i = 0; i < Object.keys(message).length; i++){
            const newRow = document.createElement("tr");
            newRow.id = `row${message[i].id}`;
            newRow.className = "text-bg-secondary p-3";
            tableContainer.appendChild(newRow);
            const appendedRow = document.getElementById(`row${message[i].id}`);
            let eventHTML = `<td>${message[i].Event}</td>
                <td>${message[i].StartDate}</td>
                <td>${message[i].EndDate}</td>
                <td>${message[i].Notes}</td>
                <td><button onclick="deleteEventBtn(${message[i].id})" type="button" class="btn btn-danger" id="deleteBtn${i}">Delete</button></td>`
            appendedRow.insertAdjacentHTML('beforeend', eventHTML);
        }}
    );
    dbJsonSize += 1;
}

onLoadAddTableData();
//I created a function when the submit buttion is pressed it takes the values of the inputs below the table then adds them to the data based;
async function onCreateEventClick(){
    const eventValue = document.getElementById('eventInput').value;
    const notesValue = document.getElementById("notesInput").value;
    const startDateValue = document.getElementById("startDate").value;
    const endDateValue = document.getElementById("endDate").value;
    if(eventValue == ""||notesValue ==""||startDateValue ==""||endDateValue ==""){
        alert("Warning Input Empty!!")
    }else{
        const JsonValues = { id: ""+dbJsonSize, Event: ""+eventValue, StartDate: ""+startDateValue, EndDate: ""+endDateValue, Notes: ""+notesValue };
        
        await fetch("http://localhost:3000/Events", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(JsonValues)
        })
        document.getElementById('eventInput').value = '';
        document.getElementById("notesInput").value = '';
        document.getElementById("startDate").value = '';
        document.getElementById("endDate").value = '';
        onLoadAddTableData();
    }
    
}
//This function deletes items from the data base file;
async function deleteEventBtn(id){
    const deleteBtn = document.getElementById(`row${id}`);
    await fetch(`http://localhost:3000/Events/${(id)}`,{
        method: "DELETE"
    })
    await onLoadAddTableData();
}