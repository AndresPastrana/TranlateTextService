import { match,Match } from "path-to-regexp";
import {Routes} from '../../index.js'
export const isMatch =(pathname: string ):Match| false =>{
   const routes = Object.values(Routes)
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      const matchfn =match(route,{ decode: decodeURIComponent })
      const isMatch = matchfn(pathname)
       if (isMatch) return isMatch
    }

  return false
}