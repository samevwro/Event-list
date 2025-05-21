
const tableContainer = document.getElementById('tableInput')


async function onLoadAddTableData() {
    const response = await fetch("http://localhost:3000/Events")
    const eventList = await response.json()
    
    console.log(eventList[0].StartDate)
    const newRow = document.createElement("tr")
    const newData = document.createElement("td")
    
}
onLoadAddTableData()