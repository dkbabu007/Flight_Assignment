function tablecreatorforSinFlight(data,i){
  let html='<div id="card" style="background-color:black; color:white; height:auto; width:95%;margin:5px;padding:2px;"><table> <tr>';
    html+='<td><h2>Rs. '+data[i].price+'</h2></td></tr>';
    html+='<tr><td><h6>'+data[i].flightNo+'</h6></td></tr>';
    html+='<tr><td><h5>'+data[i].sourceCode+'>'+data[i].DestinationCode+'</h5></td></tr>';
    html+='<tr><td><h6>'+data[i].DepartTime+'</h6></td></tr>';
    html+='<tr><td><h6>'+data[i].ArivalTime+'</h6></td>';
    html+='</tr></table></div>' ;
    return html;
    
}
function tablecreatorfordualFlight(data,i,j){
  let x = parseInt(data[i].price)+parseInt(data[j].price);
  let html='<div id="card" style="background-color:black; color:white; height:auto; width:95%;margin:5px;padding:2px;" ><table> <tr>';
    html+='<td><h2>Rs. '+x+'</h2></td></tr>';
    html+='<tr><td><h6>'+data[i].flightNo+'</h6></td><td><h6>'+data[j].flightNo+'</h6></td></tr>';
    html+='<tr><td><h5>'+data[i].sourceCode+'>'+data[i].DestinationCode+'</h5></td><td><h5>'+data[j].sourceCode+'>'+data[j].DestinationCode+'</h5></tr>';
    html+='<tr><td><h6>'+data[i].DepartTime+'</h6></td><td><h6>'+data[j].DepartTime+'</h6></td></tr>';
    html+='<tr><td><h6>'+data[i].ArivalTime+'</h6><td><h6>'+data[j].ArivalTime+'</h6></td>';
    html+='</tr></table></div>' ;
    return html;
}
function routewriter(flag,data,depDate,retDate,i){
  if(flag==1){
    if(retDate==''){
      let ht='<table><tr><td rowspan="2"><h2>'+data[i].sourceCode+'>'+data[i].DestinationCode+'</h2></td>';
      ht+='<td rowspan="2">Depart Date:'+depDate+'</td></tr><table>';
      document.getElementById("route").innerHTML=ht;
      flag=0;
      return flag;
    }
    else{
      let ht='<table><tr><td rowspan="2"><h2>'+data[i].sourceCode+'>'+data[i].DestinationCode+'>'+data[i].sourceCode+'</h2></td>';
      ht+='<td>Depart Date:'+depDate+'</td></tr>';
      ht+='<tr><td>Return Date:'+retDate+'</td></tr></table>';
      flag=0;
      document.getElementById("route").innerHTML=ht;
      return flag;
    }
  }
}
function checkPort(source,destination,depDate,retDate,passNum){
  console.log(source)
  const airports=["New Delhi","Mumbai","Patna","Ranchi","Ahmedabad"];
  let flag_1=0,flag_2=0;
  for(let i=0;i<airports.length;i=i+1){
    console.log(i)
    if(source==airports[i] && destination!=airports[i]){
      flag_1=1;
    }
    if(destination==airports[i]&& source!=airports[i] ){
      flag_2=1;
    }
  }
  const d = new Date();
  console.log(d)
  console.log(depDate)
  console.log(retDate)
  const d1=new Date(depDate);
  const d2=new Date(retDate)
  console.log(d1);
  if(d1.getDate()==d.getDate()&&d1.getFullYear()==d.getFullYear()&&d1.getMonth==d.getMonth){
    console.log("Equal Dates")
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
    console.log("li "+li);
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
  var retDate='';
  var source=document.getElementById("source").value;
  var destination=document.getElementById("destination").value;
  var depDate=document.getElementById("DepDate").value;
  retDate=document.getElementById("RetDate").value;
  var passNum=document.getElementById("PassengerNo").value;
  let a=checkPort(source,destination,depDate,retDate,passNum);
  console.log(a)
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
        console.log(testD+" "+date);
        if(data[i].source==source&&data[i].Destination==destination&&testD.getDate()==date.getDate()&&testD.getFullYear()==date.getFullYear()&&testD.getMonth()==date.getMonth())
          html+=tablecreatorforSinFlight(data,i);//date filter for One way 
        console.log(html)
        flag=routewriter(flag,data,depDate,retDate,i);
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
                html+=tablecreatorfordualFlight(data,i,j);//DateFCilter for return flight
              } 
              j++;            
            }
          
          }
        console.log(html)
        i++;}
        document.getElementById("flight-results").innerHTML=html;
    }
  
  })
}