import React, { Component } from 'react'

import './index.css'

export default class Cart extends Component {
	render() {
		const { cart, limit } = this.props
		return (
			<div className="cart">
        <span className="cart-icon">
          <img style={{width: '18px', margin: '4px 0 0 -2px'}}
              src={require('ASSET/cart.png')} />
						{cart.quantity == 0
							? ''
							: <span className="cart-quantity">{cart.quantity}</span>}
        </span>
				{cart.price == 0
					? <span className="cart-text">{limit ? limit : 0}元起送</span>
					: cart.price < limit
						? <span className="cart-text">
								还差¥{limit - cart.price}起送
              </span>
						: <a href='#cart' className="cart-text">共 {cart.price} 元</a>}
				<div className="arrow arrow-btn"></div>
			</div>
		)
	}
}
