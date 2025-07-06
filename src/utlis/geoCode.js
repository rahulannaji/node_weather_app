// //CODE FOR CREATING FUNCTION FOR GEO-CODE
// const request=require('request');

//   const geoCode=(address,callback)=>{

//     const url='https://api.positionstack.com/v1/forward?access_key=ddb4e2ea95e801ab53f6e21034d23365&query='+encodeURIComponent(address)+'&limit=1';

//     request({url:url,json:true},(error,response)=>{
//       if(error)
//       {
//         callback("Check your Network connection.",undefined);
//       }
//       else if(response.body.data.length===0)
//       {
//         callback("Invalid Location.",undefined);
//       }
//       else
//       {
//         callback(undefined,{
//           latitude:response.body.data[0].latitude,
//           longitude:response.body.data[0].longitude
//         })
//       }
//     })
//   }

//   module.exports=geoCode;


//WRITING THE ABOVE SAME CODE USING OBJECT DESTRUCTURING SYNTAX AND OBJECT SHORTHAND SYNATX

//CODE FOR CREATING FUNCTION FOR GEO-CODE
const request=require('request');

  const geoCode=(address,callback)=>{

    const url='https://api.positionstack.com/v1/forward?access_key=ddb4e2ea95e801ab53f6e21034d23365&query='+encodeURIComponent(address)+'&limit=1';

    request({url,json:true},(error,{body})=>{
      if(error)
      {
        callback("Check your Network connection.",undefined);
      }
      else if(body.error ||body.data.length===0)
      {
        callback("Invalid Location.",undefined);
      }
      else
      {
        callback(undefined,{
          latitude:body.data[0].latitude,
          longitude:body.data[0].longitude
        })
      }
    })
  }

  module.exports=geoCode;
