
//to ensure that this app.js file is loadeed successfully on my server
//console.log("done");


const zipCode=document.querySelector("#zip");
let my_felling=document.querySelector("#feelings");
const myBtn=document.querySelector("#generate");
let date= document.getElementById('date'); 
let temp= document.getElementById('temp'); 
let content=document.getElementById('content');

  

const baseURL='https://api.openweathermap.org/data/2.5/weather?zip=';
const urlPart='&units=metric&appid=d5a95f2cca570684b16fa9809f3e2c9c';
// mykey d5a95f2cca570684b16fa9809f3e2c9c

async function weatherRequests(){
    let zipCodeValue=zipCode.value;
    if(zipCodeValue.length!=5 || my_felling.value==""){
        alert("error zipcode or feeling section empty");
    }
    else{
      const requestUrl=`${baseURL}${zipCodeValue}${urlPart}`;

      //console.log(requestUrl);

     const res=await fetch(requestUrl);

     //transform recieved data to javascript object
     const data=await res.json();
     //console.log(data);
     //console.log(data.main.temp);
    // console.log(data.cod);
     if(data.cod==200){
         //here we send temp object to my local server
       //  console.log("done");
         const my_temp=data.main.temp;
         const feelingValue=my_felling.value;
         // Create a new date instance dynamically with JS
         let d = new Date();
         let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
       //  console.log(feelingValue);
       //console.log(newDate);
       //this object will be sent to my server
       const my_Data={
           temp:my_temp,
           comment:feelingValue,
           date:newDate
       }
      // console.log(my_Data.temp);
      if(my_Data == null){
        console.log("empty request");
      }
      else{
          //send data to server throw post request
           fetch('/post', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(my_Data)
        });

            console.log("data sent successfully to server");
       // recieve data from server throw get request
        const getData = await fetch('/get').then(data => data.json());
        //console.log(serverData);
      //updating my most recent data section with data recieved from server
        date.innerHTML = getData.date; 
        temp.innerHTML = getData.temp; 
        content.innerHTML = getData.comment;
        //updating color for recieved data
         date.style.color="white";
         temp.style.color="white";
         content.style.color="white";   
      }

     }
     else{
       //if recieved data cod from weather api web site not 200
         alert(data.message);
     }
     
    }
}
myBtn.addEventListener('click',weatherRequests);