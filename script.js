var passRet,retDate,depDate,source,destination,passNum,data1; 
//price range selector copied code
const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
let priceGap = 1000;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
    searchFlight(data1,retDate,depDate,source,destination,passNum,minVal,maxVal);
  });
}); 
//End of copied
function searchFlight(data,retDate,depDate,source,destination,passNum,minVal=2000,maxVal=99900){
  var flag=1;
    let objLength=0;
    for(l=Object.keys(data).length;objLength<=l;objLength++){//objet length
    }
    const date = new Date(depDate);//Depart date into date objet
    const date1 = new Date(retDate);//return date into date objet
    if(retDate==''){

      let i=0;
      let html ='';
      while(i<objLength-1){
        let test = String(data[i].date); 
        const testD = new Date(test); //json date into date objets
        if(data[i].source==source&&data[i].Destination==destination&&testD.getDate()==date.getDate()&&testD.getFullYear()==date.getFullYear()&&testD.getMonth()==date.getMonth()){
          html+=tablecreatorforSinFlight(data,i,minVal,maxVal,passNum);//date filter for One way 
        flag=routewriter(flag,data,depDate,retDate,i);}
        i++;}
        document.getElementById("flight-results").innerHTML=html;
    }
    else{
      let i=0;
      let html ='';

      while(i<objLength-1){
        let test = String(data[i].date); 
        const testD = new Date(test); //json date into date objets
        if(data[i].source==source&&data[i].Destination==destination&&testD.getDate()==date.getDate()&&testD.getFullYear()==date.getFullYear()&&testD.getMonth()==date.getMonth())
          { flag=routewriter(flag,data,depDate,retDate,i);
            let j=0;
            while(j<objLength-1){
              let test = String(data[j].date); 
              const testD1 = new Date(test); //json date into date objets
              if(data[j].source==destination&&data[j].Destination==source&&testD1.getDate()==date1.getDate()&&testD1.getFullYear()==date1.getFullYear()&&testD1.getMonth()==date1.getMonth()){
                html+=tablecreatorfordualFlight(data,i,j,minVal,maxVal,passNum);//DateFilter for return flight
              } 
              j++;            
            }
          
          }
        //(html)
        i++;}
        document.getElementById("flight-results").innerHTML=html;
    }
  
}
function tablecreatorforSinFlight(data,i,minVal,maxVal,passNum){
  let x =parseInt(passNum)*parseInt(data[i].price);
  let html='';
  if(x>=minVal&&x<=maxVal){
  html='<div id="card" style="background-color:black; color:white; height:auto; width:95%;margin:5px;padding:2px;"><table width="95%" height="90%"> <tr>';
    html+='<td><h2>Rs. '+x+'</h2></td></tr>';
    html+='<tr><td><h6>'+data[i].flightNo+'</h6></td><td rowspan="4"><button style="align-items:center; height:30px; width:100px;">Book Flight</button></td></tr>';
    html+='<tr><td><h5>'+data[i].sourceCode+'>'+data[i].DestinationCode+'</h5></td></tr>';
    html+='<tr><td><h6>'+data[i].DepartTime+'</h6></td></tr>';
    html+='<tr><td><h6>'+data[i].ArivalTime+'</h6></td>';
    html+='</tr></table></div>' ;
  }
    return html;
    
}
function tablecreatorfordualFlight(data,i,j,minVal,maxVal,passNum){
  let x = parseInt(data[i].price)+parseInt(data[j].price);
  x=x*parseInt(passNum);
  let html='';
  if(x>=minVal&&x<=maxVal){
  html='<div id="card" style="background-color:black; color:white; height:auto; width:95%;margin:5px;padding:2px;" ><table height:"90%" width:"95%"> <tr>';
    html+='<td><h2>Rs. '+x+'</h2></td></tr>';
    html+='<tr><td><h6>'+data[i].flightNo+'</h6></td><td><h6>'+data[j].flightNo+'</h6></td><td rowspan="4"><button style="margin-left:20px;align-items:center; height:30px; width:100px;">Book Flight</button></td></tr>';
    html+='<tr><td><h5>'+data[i].sourceCode+'>'+data[i].DestinationCode+'</h5></td><td><h5>'+data[j].sourceCode+'>'+data[j].DestinationCode+'</h5></td></tr>';
    html+='<tr><td><h6>'+data[i].DepartTime+'</h6></td><td><h6>'+data[j].DepartTime+'</h6></td></tr>';
    html+='<tr><td><h6>'+data[i].ArivalTime+'</h6><td><h6>'+data[j].ArivalTime+'</h6></td>';
    html+='</tr></table></div>' ;
  }
    return html;
}
function routewriter(flag,data,depDate,retDate,i){
  if(flag==1){
    if(retDate==''){
      let ht='<table width="95%" height="90%"><tr><td rowspan="2" style="text-align:left; vertical-align:middle;"><h2>'+data[i].sourceCode+'>'+data[i].DestinationCode+'</h2></td>';
      ht+='<td rowspan="2" style="text-align:right">Depart Date:'+depDate+'</td></tr><table>';
      document.getElementById("route").innerHTML=ht;
      flag=0;
      return flag;
    }
    else{
      let ht='<table width="95%" height="90%"><tr><td rowspan="2" style="text-align:left; vertical-align:middle;"><h2>'+data[i].sourceCode+'>'+data[i].DestinationCode+'>'+data[i].sourceCode+'</h2></td>';
      ht+='<td style="text-align:right">Depart Date:'+depDate+'</td></tr>';
      ht+='<tr><td style="text-align:right">Return Date:'+retDate+'</td></tr></table>';
      flag=0;
      document.getElementById("route").innerHTML=ht;
      return flag;
    }
  }
}
function checkPort(source,destination,depDate,retDate,passNum){
  const airports=["New Delhi","Mumbai","Patna","Ranchi","Ahmedabad"];
  let flag_1=0,flag_2=0;
  for(let i=0;i<airports.length;i=i+1){
    if(source==airports[i] && destination!=airports[i]){
      flag_1=1;
    }
    if(destination==airports[i]&& source!=airports[i] ){
      flag_2=1;
    }
  }
  const d = new Date();
  const d1=new Date(depDate);
  const d2=new Date(retDate)
  if(d1.getDate()==d.getDate()&&d1.getFullYear()==d.getFullYear()&&d1.getMonth==d.getMonth){

  }
  else if(d1<d){
    alert("Entered Date has Passed");
    document.getElementById("form").reset();
  }
  if(d2<d1&&retDate!=''){
    alert("Return Date must be greater than Departure Date");

    document.getElementById("form").reset();
  }
  if(passNum<1||passNum>=4){
    alert("Number of Passengers must be between 1 to 4");
    document.getElementById("form").reset();
  }
  const li=new Array(flag_1,flag_2);
    return li;
}
function myF(){
  document.getElementById("RetDate").disabled=true;
  
}
function myF1(){
  document.getElementById("RetDate").disabled=false;
}
function callvalue(){
  event.preventDefault();
  retDate='';
  source=document.getElementById("source").value;
  destination=document.getElementById("destination").value;
  depDate=document.getElementById("DepDate").value;
  retDate=document.getElementById("RetDate").value;
  passNum=document.getElementById("PassengerNo").value;
  let a=checkPort(source,destination,depDate,retDate,passNum);
  if(a[0]==0  && a[1]==0){
    alert("Both Inputs Are Wrong\n Please Enter Valid Input");
    document.getElementById("form").reset();
  }
  else if(a[0]==0&&a[1]==1){
    alert("Origin Input is Wrong\n Please Enter Valid Input");
    document.getElementById("form").reset();
  }
  else if(a[0]==1&&a[1]==0){
    alert("Destination Input is Wrong\n Please Enter Valid Input");
    document.getElementById("form").reset();
  }
  else{
      /*let des=source+" > "+destination+" > "+source;
      document.getElementById("route").innerHTML=des;
      let dep="Depart : "+depDate;
      let ret="Return : "+retDate;
      let s=dep+"<br>"+ret;
      document.getElementById("depdt").innerHTML=s;*/
      document.getElementById("form").reset();
  }
  fetch('./data.json')//Fetching JSON File
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    data1=data;
    searchFlight(data1,retDate,depDate,source,destination,passNum);
  })
}