import { translate } from './src/services/translate.js';
import { appendBody } from "./src/helpers/appendBody.js";
import {
  IncomingMessage,
  ServerResponse,
  createServer,
} from "node:http";
import { isMatch } from "./src/helpers/matchPath.js";
import { RequestBody } from './src/types.js';

export const Routes = {
  translate: "/translate",
};
const handleRequest = async (req:IncomingMessage, resp: ServerResponse) => {
  try {
    const isMatched = isMatch(req.url as string);
    if (isMatched && req.method === "POST") {
      await appendBody(req);
      const {body}= req
      const{fromLanguage='',toLanguage='',inputText=''}= body
      
      // TODO: Validate the reqBodyData with zod

      // TODO:Translate the text
      const translatedText =  await translate({fromLanguage,toLanguage,inputText})
      // TODO: Send the translated text
      console.log("Result from translation");
      console.log(translatedText);
      
      
      return resp.end(`<code>${JSON.stringify(translatedText)}</code>`);
    }
    return resp.end("<h1>Not found</h1>");
  } catch (error) {
    return resp.end(`<h1>${JSON.stringify(error)}</h1>`)
  }
};

// let isProd = process.env.NODE_ENV === "produccion";
const port = process.env.SERVER_PORT || 5656;

export  const server = createServer(handleRequest).listen(port, () => {
  console.log(`${process.env.NODE_ENV}:NodeJS`);
  console.log(`http://localhost:${port}/translate `);
});

// }

// Shut Down server
const shutdown = () => {
  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
