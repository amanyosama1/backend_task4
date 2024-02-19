const express =require('express')
const app=express()
const port=process.env.PORT || 3000

const path=require ("path")

const publicDirectory=path.join(__dirname,'../public')
app.use(express.static(publicDirectory))


////////////////////////////////////////////////////////////////////////////
app.set('view engine','hbs')

    const viewsDirectory =path.join(__dirname,"../temp1/views")
    app.set("views",viewsDirectory)


    var hbs =require('hbs')
    const partialsPath = path.join(__dirname ,"../temp1/partials" )

    hbs.registerPartials(partialsPath)



    
app.get('/',(req,res)=>{
    res.render('index',{
        title:"HOME PAGE",
        desc: "this is home page"
    })           //show dynamic pages
})
app.get('/checkWeather',(req,res)=>{
    res.render('checkWeather',{
        title:"CHECK WEATHER PAGE",
        name:"amany",
        city:"mansoura",
        age:22,
        img1:"images/photo1.jpg"
    })           //show dynamic pages
})


const geocode = require ('./tools/geocode.js')
const forecast =require ('./tools/forecast.js')
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "you must enter an address"
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send ({error})
        }

        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                return res.send ({error})
            }
            res.send({
                latitude:data.latitude,
                longitude:data.longitude,
                currentweather : forecastData.currentweather,
                temperature:forecastData.temperature,
                location : req.query.address,

                
            })
        })
    })
       
    })

app.get('*',(req,res)=>{
    res.send('404 page not found')
})
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})
