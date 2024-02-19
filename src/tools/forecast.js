const request =require('request')
const forecast = (latitude,longitude,callback)=>{
const url="http://api.weatherapi.com/v1/current.json?key=d744d4ddebe04e8eae1202908241302&q="+latitude+","+longitude
request({url, json:true},(error,response)=>{
    if(error){
        callback("cannot connect ",undefined)
    }else if(response.body.error){
        callback(response.body.error.message,undefined)
    }else{
         callback(undefined,{
            currentweather:response.body.current.condition.text,
            temperature:response.body.current.temp_c +"c (" + response.body.current.temp_f+"f )"
         })
    }
})
}
module.exports=forecast

//response.body.location.name+".It is "+response.body.current.condition.text+" And Temp is " + response.body.current.temp_c +"c ("+response.body.current.temp_f+"f )"