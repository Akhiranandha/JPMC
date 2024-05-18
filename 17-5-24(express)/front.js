const url = "http://localhost:4321/api/students"

async function getData(){
    var data = await axios.get(url)
    console.log(data.data)
    res="<tr><th>Id</th><th>Name</th><th>Dept</th><th>Edit</th></tr>"
    data.data.forEach(ele => {
        res+=`<tr>
        <td>${ele.id}</td>
        <td>${ele.name}</td>
        <td>${ele.dept}</td>
        <td>
        <button onclick="deleteData(${ele.id})">Remove</button>
        <button onclick="updateData(${ele.id})">Update</button>
        </td>
        </tr>`
    });
    document.getElementById("result").innerHTML=res;
    document.getElementById("id").value=""
    document.getElementById("name").value=""
    document.getElementById("dept").value=""
    
}

async function insertData(){
    obj={
        id:parseInt(document.getElementById("id").value),
        name:document.getElementById("name").value,
        dept:document.getElementById("dept").value
    }
    
    await axios.post(url,obj)
}
async function deleteData(id=null){
    if(id==null)
        id=parseInt(document.getElementById("id").value)
    await axios.delete(url+`/${id}`)
}

async function updateData(id=null){
    if(id==null)
        id=parseInt(document.getElementById("id").value)
    obj={
        name:document.getElementById("name").value,
        dept:document.getElementById("dept").value
    }
    await axios.patch(url+`/${id}`,obj)
}