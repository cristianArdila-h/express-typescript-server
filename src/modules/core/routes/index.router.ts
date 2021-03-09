import { Router } from 'express';


class IndexRouter {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/prueba',  (req, res)=> res.send('test del servidor'));
    }
}

const indexRouter = new IndexRouter();
export default indexRouter.router;
