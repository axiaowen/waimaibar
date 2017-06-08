import React, { Component } from 'react'

import './Opt.css'

export default class Opt extends Component {
	render() {
		var { showPrice, item, incToCart, decFromCart } = this.props
		return (
			<div>
        {(item.inventory == 0)
					? <div className='box text disabled'>已售完</div>
          : <div className={'box ' + (showPrice ? 'text' : 'add')} onClick={()=>incToCart(item.id)}>
							{showPrice ? '¥' + item.price : '+'}
						</div>}
				{item.quantity
					? <div>
							<div className='box num'>{item.quantity}</div>
							<div className='box dec' onClick={()=>decFromCart(item.id)}>━</div>
						</div>
					: ''}
			</div>
		)
	}
}

