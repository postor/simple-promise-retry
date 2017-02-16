
  /**
   * @param {Function} promiseFn 一个会返回Promise的函数，无参数
   * @param {Number} limit 重试次数
   * @returns {Promise} 成功情况返回promiseFn产生Promise的成功结果，否则返回一个数组，包含每次promiseFn产生Promise的失败结果
   * 
  // 使用方法 
  function getPromise(){
    return new Promise((resolve,reject)=>{
      setTimeout(function(){
        var result = Math.random()>0.9
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

  */
  function retryPromise(promiseFn,limit){
    var promiseFns = [], history = []
    for(var i=1;i<limit;i++){
      promiseFns.push(getFailPromise)
    }
    var failPromiseChain = promiseFns.reduce((prev,cur)=>{
      return prev.then(cur)
    },getFailPromise())
    
    return new Promise((resolve,reject)=>{
      failPromiseChain.then((result)=>{
        reject(history)
      },(error)=>{
        if(history.length){
          var i = 1;
        }
        resolve(error)
      })
    })
    
    
    function getFailPromise(){
      return new Promise((resolve,reject)=>{
        promiseFn()
        .then((result)=>{
          reject(result)
        })
        .catch((error)=>{
          history.push(error)
          resolve(true)
        })
      })
    }
    
  }
  
  module.exports = retryPromise