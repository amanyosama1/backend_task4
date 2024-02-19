let form =document.getElementById("form1")
console.log('data')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    //console.log(document.getElementById("address").value)
    weatherFun()
    //form.reset()
})
const errorFun = document.getElementById('error')
const locationFun = document.getElementById('location')
const forecastFun = document.getElementById('forecast')
const latitudeFun=document.getElementById('latitude')
const longitudeFun=document.getElementById('longitude')
const currentweatherFun = document.getElementById('weather')
const temperatureFun=document.getElementById('temperature') 

let weatherFun = async()=>{
    try{
        var address=document.getElementById('address').value
        
        const res = await fetch('http://localhost:3000/weather?address='+address)
        const data = await res.json()
        if(data.error){
            errorFun.innerText = data.error
            locationFun.innerText='NO DATA FOUND'
            latitudeFun.innerText='NO DATA FOUND'
            longitudeFun.innerText='NO DATA FOUND'
            temperatureFun.innerText='NO DATA FOUND'
            currentweatherFun.innerText='NO DATA FOUND'

        }else{
            locationFun.innerText=data.location
            latitudeFun.innerText=data.latitude
            longitudeFun.innerText=data.longitude
            temperatureFun.innerText=data.temperature
            currentweatherFun.innerText=data.currentweather
            errorFun.innerText = 'NO ERROR'

        }
    }catch(e){
        console.log(e)
    }
}
