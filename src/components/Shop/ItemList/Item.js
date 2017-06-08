import React, { Component } from 'react'
import { connect } from 'react-redux'

import SpecModal from '../SpecModal'
import Opt from './Opt'

class Item extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showSpecs: false
		}
	}

	render() {
		const { name, price, description, imgUrl, labels } = this.props.item
		const { item, category, incToCart, decFromCart } = this.props
		var style = {
			img: {
				width: '40px',
				marginRight: '8px',
				border: '1px solid #ccc',
				borderRadius: '5px'
			},
			text: {
				lineHeight: '110%',
				margin: '4px 0 0 0',
				fontSize: '18px',
				color: '#454545'
			}
		}
		return (
			<div style={this.props.style}>
				{category.is_not_avaliable
					? <div className='box text disabled'>¥{price}</div>
					: item.specs
						? <div
							className='box text'
							onClick={() => this.setState({showSpecs: true})}
						>购买</div>
						: <Opt
								showPrice={true}
								item={item}
								incToCart={incToCart}
								decFromCart={decFromCart} />}
				{imgUrl
					?	<img style={style.img} src='' />
					: ''}
				<div style={style.text}>
					<strong>{name}</strong>
				</div>
				<div className="item-description">
					{labels.map(label =>
						<span className='item-label'>{label}</span>)}
					{description
						?	<span>{description}</span>
						: ''}
				</div>
				{item.specs
					?	<SpecModal
							isDisplay={this.state.showSpecs}
							onClose={() => this.setState({showSpecs: false})}
							item={item}
							incToCart={incToCart}
							decFromCart={decFromCart}
						/>
					: ''}
			</div>
		)
	}
}

export default connect(
	null,
	require('ACTION/cart').default,
)(Item)
