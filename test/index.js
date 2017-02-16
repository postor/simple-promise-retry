var retryPromise = require('../') 
// 使用方法 
  function getPromise(){
    return new Promise((resolve,reject)=>{
      setTimeout(function(){
        var result = Math.random()>0.8
        console.log(result)
        if(result){
          resolve(true)
        }else{
          reject(false)
        }
      },1000)
    })
  }

  retryPromise(getPromise,5).then((result)=>{
    console.log(['succ',result])
  },(err)=>{
    console.log(['err:',err])
  })
