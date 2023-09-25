var i=Object.create;var{defineProperty:v,getPrototypeOf:a,getOwnPropertyNames:r}=Object;var p=Object.prototype.hasOwnProperty;var s=(D,z,N)=>{N=D!=null?i(a(D)):{};const A=z||!D||!D.__esModule?v(N,"default",{value:D,enumerable:!0}):N;for(let H of r(D))if(!p.call(A,H))v(A,H,{get:()=>D[H],enumerable:!0});return A};var n=(D,z)=>()=>(z||D((z={exports:{}}).exports,z),z.exports);var m=n((l)=>{var o=function(D){var z=[],N=0;while(N<D.length){var A=D[N];if(A==="*"||A==="+"||A==="?"){z.push({type:"MODIFIER",index:N,value:D[N++]});continue}if(A==="\\"){z.push({type:"ESCAPED_CHAR",index:N++,value:D[N++]});continue}if(A==="{"){z.push({type:"OPEN",index:N,value:D[N++]});continue}if(A==="}"){z.push({type:"CLOSE",index:N,value:D[N++]});continue}if(A===":"){var H="",G=N+1;while(G<D.length){var J=D.charCodeAt(G);if(J>=48&&J<=57||J>=65&&J<=90||J>=97&&J<=122||J===95){H+=D[G++];continue}break}if(!H)throw new TypeError("Missing parameter name at ".concat(N));z.push({type:"NAME",index:N,value:H}),N=G;continue}if(A==="("){var Y=1,U="",G=N+1;if(D[G]==="?")throw new TypeError("Pattern cannot start with \"?\" at ".concat(G));while(G<D.length){if(D[G]==="\\"){U+=D[G++]+D[G++];continue}if(D[G]===")"){if(Y--,Y===0){G++;break}}else if(D[G]==="("){if(Y++,D[G+1]!=="?")throw new TypeError("Capturing groups are not allowed at ".concat(G))}U+=D[G++]}if(Y)throw new TypeError("Unbalanced pattern at ".concat(N));if(!U)throw new TypeError("Missing pattern at ".concat(N));z.push({type:"PATTERN",index:N,value:U}),N=G;continue}z.push({type:"CHAR",index:N,value:D[N++]})}return z.push({type:"END",index:N,value:""}),z},C=function(D,z){if(z===void 0)z={};var N=o(D),A=z.prefixes,H=A===void 0?"./":A,G="[^".concat(F(z.delimiter||"/#?"),"]+?"),J=[],Y=0,U=0,V="",K=function(B){if(U<N.length&&N[U].type===B)return N[U++].value},I=function(B){var M=K(B);if(M!==void 0)return M;var W=N[U],S=W.type,q=W.index;throw new TypeError("Unexpected ".concat(S," at ").concat(q,", expected ").concat(B))},Z=function(){var B="",M;while(M=K("CHAR")||K("ESCAPED_CHAR"))B+=M;return B};while(U<N.length){var $=K("CHAR"),O=K("NAME"),E=K("PATTERN");if(O||E){var X=$||"";if(H.indexOf(X)===-1)V+=X,X="";if(V)J.push(V),V="";J.push({name:O||Y++,prefix:X,suffix:"",pattern:E||G,modifier:K("MODIFIER")||""});continue}var w=$||K("ESCAPED_CHAR");if(w){V+=w;continue}if(V)J.push(V),V="";var L=K("OPEN");if(L){var X=Z(),b=K("NAME")||"",Q=K("PATTERN")||"",P=Z();I("CLOSE"),J.push({name:b||(Q?Y++:""),pattern:b&&!Q?G:Q,prefix:X,suffix:P,modifier:K("MODIFIER")||""});continue}I("END")}return J},t=function(D,z){return g(C(D,z),z)},g=function(D,z){if(z===void 0)z={};var N=R(z),A=z.encode,H=A===void 0?function(U){return U}:A,G=z.validate,J=G===void 0?!0:G,Y=D.map(function(U){if(typeof U==="object")return new RegExp("^(?:".concat(U.pattern,")$"),N)});return function(U){var V="";for(var K=0;K<D.length;K++){var I=D[K];if(typeof I==="string"){V+=I;continue}var Z=U?U[I.name]:void 0,$=I.modifier==="?"||I.modifier==="*",O=I.modifier==="*"||I.modifier==="+";if(Array.isArray(Z)){if(!O)throw new TypeError("Expected \"".concat(I.name,"\" to not repeat, but got an array"));if(Z.length===0){if($)continue;throw new TypeError("Expected \"".concat(I.name,"\" to not be empty"))}for(var E=0;E<Z.length;E++){var X=H(Z[E],I);if(J&&!Y[K].test(X))throw new TypeError("Expected all \"".concat(I.name,"\" to match \"").concat(I.pattern,"\", but got \"").concat(X,"\""));V+=I.prefix+X+I.suffix}continue}if(typeof Z==="string"||typeof Z==="number"){var X=H(String(Z),I);if(J&&!Y[K].test(X))throw new TypeError("Expected \"".concat(I.name,"\" to match \"").concat(I.pattern,"\", but got \"").concat(X,"\""));V+=I.prefix+X+I.suffix;continue}if($)continue;var w=O?"an array":"a string";throw new TypeError("Expected \"".concat(I.name,"\" to be ").concat(w))}return V}},e=function(D,z){var N=[],A=T(D,N,z);return f(A,N,z)},f=function(D,z,N){if(N===void 0)N={};var A=N.decode,H=A===void 0?function(G){return G}:A;return function(G){var J=D.exec(G);if(!J)return!1;var Y=J[0],U=J.index,V=Object.create(null),K=function(Z){if(J[Z]===void 0)return"continue";var $=z[Z-1];if($.modifier==="*"||$.modifier==="+")V[$.name]=J[Z].split($.prefix+$.suffix).map(function(O){return H(O,$)});else V[$.name]=H(J[Z],$)};for(var I=1;I<J.length;I++)K(I);return{path:Y,index:U,params:V}}},F=function(D){return D.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")},R=function(D){return D&&D.sensitive?"":"i"},D0=function(D,z){if(!z)return D;var N=/\((?:\?<(.*?)>)?(?!\?)/g,A=0,H=N.exec(D.source);while(H)z.push({name:H[1]||A++,prefix:"",suffix:"",modifier:"",pattern:""}),H=N.exec(D.source);return D},N0=function(D,z,N){var A=D.map(function(H){return T(H,z,N).source});return new RegExp("(?:".concat(A.join("|"),")"),R(N))},z0=function(D,z,N){return y(C(D,N),z,N)},y=function(D,z,N){if(N===void 0)N={};var A=N.strict,H=A===void 0?!1:A,G=N.start,J=G===void 0?!0:G,Y=N.end,U=Y===void 0?!0:Y,V=N.encode,K=V===void 0?function(q){return q}:V,I=N.delimiter,Z=I===void 0?"/#?":I,$=N.endsWith,O=$===void 0?"":$,E="[".concat(F(O),"]|$"),X="[".concat(F(Z),"]"),w=J?"^":"";for(var L=0,b=D;L<b.length;L++){var Q=b[L];if(typeof Q==="string")w+=F(K(Q));else{var P=F(K(Q.prefix)),B=F(K(Q.suffix));if(Q.pattern){if(z)z.push(Q);if(P||B)if(Q.modifier==="+"||Q.modifier==="*"){var M=Q.modifier==="*"?"?":"";w+="(?:".concat(P,"((?:").concat(Q.pattern,")(?:").concat(B).concat(P,"(?:").concat(Q.pattern,"))*)").concat(B,")").concat(M)}else w+="(?:".concat(P,"(").concat(Q.pattern,")").concat(B,")").concat(Q.modifier);else if(Q.modifier==="+"||Q.modifier==="*")w+="((?:".concat(Q.pattern,")").concat(Q.modifier,")");else w+="(".concat(Q.pattern,")").concat(Q.modifier)}else w+="(?:".concat(P).concat(B,")").concat(Q.modifier)}}if(U){if(!H)w+="".concat(X,"?");w+=!N.endsWith?"$":"(?=".concat(E,")")}else{var W=D[D.length-1],S=typeof W==="string"?X.indexOf(W[W.length-1])>-1:W===void 0;if(!H)w+="(?:".concat(X,"(?=").concat(E,"))?");if(!S)w+="(?=".concat(X,"|").concat(E,")")}return new RegExp(w,R(N))},T=function(D,z,N){if(D instanceof RegExp)return D0(D,z);if(Array.isArray(D))return N0(D,z,N);return z0(D,z,N)};Object.defineProperty(l,"__esModule",{value:!0});l.pathToRegexp=l.tokensToRegexp=l.regexpToFunction=l.match=l.tokensToFunction=l.compile=l.parse=void 0;l.parse=C;l.compile=t;l.tokensToFunction=g;l.match=e;l.regexpToFunction=f;l.tokensToRegexp=y;l.pathToRegexp=T});var j=({fromLanguage:D,toLanguage:z,inputText:N})=>{return{fromLanguage:D,toLanguage:z,inputText:N,translatedTex:"Texto traducido"}};var _=(D)=>{return new Promise((z,N)=>{let A="";try{D.on("data",(H)=>{A=H.toString("utf-8"),z(D.body=JSON.parse(A))})}catch(H){N("Error parsing the body")}})};import{createServer as Q0} from"node:http";var x=s(m(),1);var c=(D)=>{const z=Object.values(h);for(let N=0;N<z.length;N++){const A=z[N],G=x.match(A,{decode:decodeURIComponent})(D);if(G)return G}return!1};var h={translate:"/translate"},U0=async(D,z)=>{try{if(c(D.url)&&D.method==="POST"){await _(D);const{body:A}=D,{fromLanguage:H="",toLanguage:G="",inputText:J=""}=A,Y=await j({fromLanguage:H,toLanguage:G,inputText:J});return console.log("Result from translation"),console.log(Y),z.end(`<code>${JSON.stringify(Y)}</code>`)}return z.end("<h1>Not found</h1>")}catch(N){return z.end(`<h1>${JSON.stringify(N)}</h1>`)}},u=process.env.SERVER_PORT||5656,V0=Q0(U0).listen(u,()=>{console.log("development:NodeJS"),console.log(`http://localhost:${u}/translate `)}),k=()=>{V0.close(()=>{process.exit(0)})};process.on("SIGINT",k);process.on("SIGTERM",k);export{V0 as server,h as Routes};
