import env from './config/env';
import { Application, Router } from './libs/application';
import { initRoutes } from './routes';

const app = new Application(env.BASE_URL);
const router = new Router();

initRoutes(router);

app.use(router.routerMiddleware);

app.listen(env.PORT, () => console.log(`Server started on PORT ${env.PORT}`));
