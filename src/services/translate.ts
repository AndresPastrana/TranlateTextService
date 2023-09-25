import { RequestBody } from "../types.js"

// this function will use the translation service and return teh translated text
export const translate = ({fromLanguage,toLanguage,inputText}:RequestBody)=>{
       
  return {
    fromLanguage ,
    toLanguage,
    inputText,
    translatedTex :"Texto traducido"
  } 
}