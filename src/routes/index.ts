import { Router } from 'express';
import authenticationRouter from './authentication.routes';
import costumersRouter from './costumers.routes';
import productsRouter from './products.routes';
import stockRouter from './stock.routes';
import stockTransactionsRouter from './stock.transactions.routes';

const routes = Router();

routes.use('/auth', authenticationRouter);
routes.use('/costumers', costumersRouter);
routes.use('/products', productsRouter);
routes.use('/stock', stockRouter);
routes.use('/stock/transactions', stockTransactionsRouter);

export default routes;
