import { Application, Router } from 'express'
import { ProductRouter } from './product.router'
import { CategoryRouter } from './category.router'
import { CustomerRouter } from './customer.router'
import { WalletRouter } from './wallet.router'

// main router
const _routes: Array<[String, Router]> = [
  ['/api/products', ProductRouter],
  ['/api/categories', CategoryRouter],
  ['/api/customers', CustomerRouter],
  ['/api/wallets', WalletRouter]
]

const routes = (app: Application) => {
  _routes.forEach((route: [any, Router]) => {
    const [path, router] = route
    app.use(path, router)
    // ini sama saja dengan app.use("/task", TaskRouter)
  })
}

export default routes
