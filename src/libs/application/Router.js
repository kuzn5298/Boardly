export class Router {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
      PUT: {},
      DELETE: {},
    };
  }

  get(path, handler) {
    this.routes.GET[path] = handler;
    return this;
  }

  post(path, handler) {
    this.routes.POST[path] = handler;
    return this;
  }

  put(path, handler) {
    this.routes.PUT[path] = handler;
    return this;
  }

  delete(path, handler) {
    this.routes.DELETE[path] = handler;
    return this;
  }

  routerMiddleware = (req, res, next) => {
    const { method, pathname } = req;
    const handler = this.routes[method][pathname];
    if (handler) {
      handler(req, res, next);
    } else {
      res.statusCode = 404;
      res.send({ message: 'Not found' });
    }
    next();
  };
}
