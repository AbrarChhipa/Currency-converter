let baseUrl="https://v6.exchangerate-api.com/v6/[YOUR_KEY]]/latest/${fromCur.value}";
let drop=document.querySelectorAll(".dropdown select");
let btn =document.querySelector("form button");
let fromcur=document.querySelector(".from select");
let tocur=document.querySelector(".to select");
let rate=document.querySelector(".rate")

for(let select of drop){
    for(curcode in countryList){
      let newOpt=document.createElement("option")
      newOpt.innerText=curcode;
      newOpt.value=curcode;
      if(select.name==="from"&&curcode==="USD"){
        newOpt.selected="selected";
      }else if(select.name==="to"&&curcode==="INR"){
        newOpt.selected="selected";
      }
      select.append(newOpt);
      
    }
    select.addEventListener("change", (evt)=>{
            updateFlag(evt.target);
    })
}

let updateFlag=(element)=>{
    
    let curcode=element.value;
    let cntrCode=countryList[curcode];
    let newSrs=`https://flagsapi.com/${cntrCode}/flat/64.png`;
    let img=element.parentElement .querySelector("img");
    img.src=newSrs;
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
  updaterate();

})

let updaterate=async()=>{
  let amount=document.querySelector(".amount input")
  let amtval=amount.value;
  if(amtval===""||amtval<1){
      amtval=1;
      amount.value="1";
  }

  let url=`https://v6.exchangerate-api.com/v6/fdf3d4413cd1bd727e0d2406/latest/${fromcur.value}`
  let responce=await fetch(url);
  let data = await responce.json();
  // console.log(data);
  const exchangeRate = data.conversion_rates[tocur.value];
  const totalExRate = (amtval * exchangeRate).toFixed(2);
  rate.innerText = `${amtval} ${fromcur.value} = ${totalExRate} ${tocur.value}`;

}
window.addEventListener("load",()=>{
  updaterate();
})
