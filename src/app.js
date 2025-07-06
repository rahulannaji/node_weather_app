const path=require('path');
const express=require('express');
const hbs=require('hbs');

const geocode=require('./utlis/geoCode.js');
const forecast=require('./utlis/foreCast');

console.log(__dirname);

//console.log(__filename);
console.log(path.join(__dirname,'../public'))

const app=express();

//app.com
//app.com/help
//app.com/about

//define paths for Express config.
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials");

//Setup handlebars engine and views location
app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather HomePage",
        name:"Rahul"
    });
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Page",
        name:"Rahul"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        helpText:"This is a help Page",
        title:"Help Page",
        name:"Rahul"
    })
})

app.get('/products',(req,res)=>{
    // console.log(req.query);
    // console.log(req.query.search);

    if(!req.query.search)
    {
       return res.send({
            error:"Please provide any search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

//weather-Route or weather-endpoint
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"Please provide address"
        })
    }

    geocode(req.query.address,(error1,{latitude,longitude}={})=>{

        if(error1)
        {
            return res.send({
                error:error1
            })
        }
        forecast(latitude,longitude,(error2,foreCastData)=>{
            if(error2)
            {
                return res.send({
                    error:error2
                })
            }
            res.send({
                weatherInfo:foreCastData,
                address:req.query.address
            })

        })

    })
})

app.get('/help/*',(req,res)=>{
    res.render("404",{
        title:"404 Help",
        errorMessage:"Help Article not found",
        name:"Rahul"
    })
})

app.get('*',(req,res)=>{
    res.render("404",{
        title:"404",
        errorMessage:"Page not found",
        name:"Rahul"
    })
})

app.listen(3000,()=>{
    console.log("Server is up on port 3000");
})

//These are old steps above are latest according to adrew course.
//base-Route
// app.get('',(req,res)=>{
//     res.send('<h1>Welcome to weather Apllication</h1>');
// })

//help-Route
// app.get('/help',(req,res)=>{
//     res.send({
//         name:'rahul',
//         age:23
//     });
// })

// app.get('/help',(req,res)=>{
//    res.send([
//     {
//         name:'Sai'
//     },
//     {
//         name:'Reddy'
//     },
//     {
//         age:23
//     }
//    ])
// })



//about-Route
// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>');
// })



