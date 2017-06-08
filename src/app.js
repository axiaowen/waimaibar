/* 入口启动文件 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import store, { history } from 'STORE'
// import routes from 'ROUTE'

import 'COMPONENT/normalize.css'
import HomePage from 'COMPONENT/Home/HomePage'
import RegionPage from 'COMPONENT/Regions/RegionPage'
import ConfirmPage from 'COMPONENT/Confirm'
import ShopPage from 'COMPONENT/Shop'
import CartPage from 'COMPONENT/Cart'
import OrderPage from 'COMPONENT/Order'
import RecordPage from 'COMPONENT/Record'
import PayPage from 'COMPONENT/Pay'

ReactDOM.render(
	<Provider store={store}>
		{/* <Router history={history} children={routes} /> */}
		<Router hostory={history}>
			<Route path="/" component={HomePage} />
			<Route path="region" component={RegionPage} />
			<Route path="confirm" component={ConfirmPage} />
			<Route path="shop/:id" component={ShopPage} />
			<Route path="cart" component={CartPage} />
			<Route path="order/:id" component={OrderPage} />
			<Route path="record" component={RecordPage} />
			<Route path="pay" component={PayPage} />
		</Router>
	</Provider>, document.getElementById('app')
)
