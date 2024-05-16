const url = "http://localhost:3000/users"

async function getData(){
    var data = await axios.get(url)
    console.log(data.data)
    res="<tr><th>Id</th><th>Name</th><th>Dept</th><th>edit</th></tr>"
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
        id:document.getElementById("id").value,
        name:document.getElementById("name").value,
        dept:document.getElementById("dept").value
    }
    
    await axios.post(url,obj)
    getData()
}
async function deleteData(id=null){
    if(id==null)
        id=document.getElementById("id").value
    await axios.delete(url+`/${id}`)
    getData()
}

async function updateData(id=null){
    if(id==null)
        id=document.getElementById("id").value
    obj={
        name:document.getElementById("name").value,
        dept:document.getElementById("dept").value
    }
    await axios.put(url+`/${id}`,obj)
    getData()
}