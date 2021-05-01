export const  donate =(userId,token,amount)=>{
    return fetch(`http://localhost:8000/api/donate/${userId}`,{
        method:"POST",
        headers:{
            Accept:"*/*",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`            
        },
        body:JSON.stringify(amount)
    }).then(response=>{
        return response.json
    }).catch(err=>console.log(err))
}