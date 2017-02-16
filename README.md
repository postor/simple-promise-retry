# simple-promise-retry
无添加，更营养
no requirements, try your promise multiple times

安装|install
```
npm install simple-promise-retry
```

使用|usage
```
var retryPromise = require('simple-promise-retry') 
  //要重试的事情封装到一个无参数函数中，函数返回对应操作的Promise即可
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
  //使用本库
  retryPromise(getPromise,5).then((result)=>{
    console.log(['succ',result])
  },(err)=>{
    console.log(['err:',err])
  })

```
结果|result
```
//成功|success
> node test/index.js --harmony

false
false
false
true
[ 'succ', true ]

//失败|fail
> node test/index.js --harmony

false
false
false
false
false
[ 'err:', [ false, false, false, false, false ] ]
```
