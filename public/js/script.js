console.log("Client side javaScript");

// fetch("http://puzzle.mead.io/puzzle").then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })



const weatherForm=document.querySelector('form');
const search=document.querySelector('input');

const messageOne=document.querySelector('#msg-1');
const messageTwo=document.querySelector("#msg-2");

// messageOne.textContent="hiii";
// messageTwo.innerText="h2222";

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value;
    // if(!location)
    // {
    //     return console.log("Enter address/location");
    // }

    messageOne.textContent="Loading....";
    messageTwo.textContent='';
    
    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent=data.error;
        }
        else
        {
            messageOne.textContent=data.weatherInfo
            messageTwo.textContent=data.address
        }
    })
})
    
    
})