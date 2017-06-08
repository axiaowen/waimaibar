import React, { Component } from 'react'

const statusColor = {
	'正在营业': '#198774',
	'接受预定': '#f39c12',
	'正在休息': '#454545',
	'暂停接单': '#454545',
	'暂停营业': '#454545'
}

export default class ShopNode extends Component {
	render() {
		const { index, shop } = this.props
		const isAvaliable = shop.status == '正在营业' || shop.status == '接受预定'
		var width = document.body.scrollWidth / 2 - 8
		var style = {
			img: {
				float: 'right',
				marginTop: '5px',
				width: width - 22,
				height: width * 2 / 4
			},
			tags: {
				display: 'inline-block',
				margin: '5px 0 0 5px'
			},
			tag: {
				fontSize: '12px',
				color: '#198774',
				border: '1px solid #198774',
				borderRadius: '2px',
				padding: '1px 3px',
				marginRight: '3px'
			},
			status: {
				position: 'absolute',
				left: '0',
				margin: '8px 0 0 10px',
				padding: 4,
				width: '25px',
				lineHeight: '110%',
				fontSize: '12px',
				backgroundColor: statusColor[shop.status],
				color: '#fff',
				borderRadius: '3px'
			}
		}

		return (
			<a href={`#shop/${shop.id}`}
				className='shop-node'
				style={{'animation-delay': index * 0.2 + 's', '-moz-animation-delay': index * 0.2 + 's', '-o-animation-delay': index * 0.2 + 's', '-webkit-animation-delay': index * 0.2 + 's'}}>
				<div className='blank-shop'
							style={{opacity: isAvaliable ? 1 : 0.5}}>
					<div style={style.status}>
						<strong>{shop.status}</strong>
					</div>
					<img style={style.img} src={'http://7xta4i.com1.z0.glb.clouddn.com/' + shop.logo} />
					<div style={style.tags}>
						{shop.tags.map((tag) => 
							<span style={style.tag} key={tag}>{tag}</span>)}
					</div>
				</div>
			</a>
		)
	}
}
