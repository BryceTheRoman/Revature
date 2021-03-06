var URL = "http://localhost:8082/Project1/all";

function fillTable(xhr){
    let ReimbursementArr = JSON.parse(xhr.responseText);

    table = document.getElementById("table");

    for(i in ReimbursementArr){
        var id = ReimbursementArr[i].reimbursementID;
        var amount = ReimbursementArr[i].amount;
        var description = ReimbursementArr[i].description;
        var type = ReimbursementArr[i].typeID;
        var submitTime = ReimbursementArr[i].subTime;
        var author = ReimbursementArr[i].author;
        var status = ReimbursementArr[i].statusID;
        var resolver = ReimbursementArr[i].resolver;


        Row = document.createElement("tr");
        if (status == 0){
            Row.setAttribute("class", "table-danger");
        } else if (status == 1){
            Row.setAttribute("class", "table-success");
        } else {
            Row.setAttribute("class", "table-active");
        }
        


        Row.innerHTML = `
        <td>${id}</td>
        <td>${author}</td>
        <td>${amount}</td>
        <td>${description}</td>
        <td>${type}</td>
        <td>${submitTime}</td>
        <td>${status}</td>
        `;
        approveTable = document.createElement("td");
        approve = document.createElement("button");
        approve.setAttribute("class","btn btn-success");
        approve.setAttribute("type", "submit");
        approve.setAttribute("value", id);
        approve.setAttribute("name", "decision");
        approve.innerHTML = "Approve";

        approveTable.appendChild(approve);
        Row.appendChild(approveTable);

        denyTable = document.createElement("td");
        deny = document.createElement("button");
        deny.setAttribute("class","btn btn-danger");
        deny.setAttribute("type", "submit");
        deny.setAttribute("value",id + '.1');
        deny.setAttribute("name", "decision");
        deny.innerHTML = "Deny";

        denyTable.appendChild(deny);
        Row.appendChild(denyTable);


        table.appendChild(Row);
    }
}

function sendAJAX(url, func){
    let xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.HTTPRequest");
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            func(this);
        }
    }
    xhr.open("GET",url);
    xhr.send();
}

sendAJAX(URL, fillTable);