import { IncomingMessage } from 'node:http';
export const appendBody =(req:IncomingMessage)=>{
  return new Promise((resolve,reject)=>{
    let body='' 

    try {
        req.on('data',(chunk:Buffer)=>{
            body=chunk.toString('utf-8')
    
                    
            resolve(req.body = JSON.parse(body))      
          })
    } catch (error) {
     reject("Error parsing the body")   
    }
   
  })
}