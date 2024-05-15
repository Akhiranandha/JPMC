const url = "http://localhost:3000/users"

async function getData(){
    var data = await axios.get(url)
    console.log(data.data)
    res="<tr><th>Name</th><th>Dept</th></tr>"
    data.data.forEach(ele => {
        res+=`<tr><td>${ele.name}</td><td>${ele.dept}</td></tr>`
    });
    document.getElementById("result").innerHTML=res;
}

async function insertData(){
    obj={
        name:document.getElementById("name").value,
        dept:document.getElementById("dept").value
    }
    
    await axios.post(url,obj)
    
}