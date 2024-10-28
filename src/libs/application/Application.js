import { parseJson, parseUrl } from './middlewares';

const http = require('http');

export class Application {
  constructor(baseUrl) {
    this.server = http.createServer(this.#handleRequest.bind(this));
    this.middlewares = [parseJson, parseUrl(baseUrl)];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  #handleRequest(req, res) {
    const runMiddlewares = (index) => {
      if (index < this.middlewares.length) {
        this.middlewares[index]?.(req, res, () => runMiddlewares(index + 1));
      } else {
        res.end();
      }
    };
    runMiddlewares(0);
  }
}
