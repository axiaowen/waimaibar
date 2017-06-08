/**
 * Created by vin on 2017/2/4.
 */

import React, {Component} from 'react'

import './index.css'

export default class Name extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isFetching: true,
			orders: []
		}
	}

	componentDidMount() {
		document.title = '我的订单'
		this.setState({isFetching: true})
		let user = '0'
		fetch(`api/user/${user}/orders`)
			.then(res => res.json())
			.then(data => {
				this.setState({
					orders: data,
					isFetching: false
				})
			})
	}

	getTime(ctime) {
		let duration = new Date() - new Date(ctime)
		let hours = Math.floor(duration % (24 * 3600 * 1000) / (3600 * 1000))
		let minutes = Math.floor(duration % (24 * 3600 * 1000) % (3600 * 1000) / (60 * 1000))
		if (hours < 24) {
			return `${hours ? hours + '小时' : ''}${minutes}分钟前`
		} else {
			return ctime
		}
	}

	render() {
		const { isFetching, orders } = this.state
		if (isFetching) {
			return <div></div>
		}

		return (
			<div>
				{orders.map(order =>
					<div className="record-section">
						{/*
						 <img
						 className="record-logo"
						 src='http://7xta4i.com1.z0.glb.clouddn.com/shop/cover/.jpg' />
						 */}
						<a href={`#order/${order.id}`}>
							<div className="record-head">
								<div className="record-status">等待餐厅接单</div>
								<div className="record-title">
									<div className="arrow"></div>
									<div className="ellipsis">{order.shop_name}</div>
									<div className="record-time">
										{this.getTime(order.create_time)}
									</div>
								</div>
							</div>
							<div>
								{order.items.map(item =>
									<div className="record-item">
										<strong style={{float: 'right'}}>¥{item.price}</strong>
										<div className="ellipsis" style={{marginRight: 40}}>
											{item.name}
										</div>
									</div>
								)}
							</div>
						</a>
					</div>
				)}
				<div className="bottom-tip">仅显示近1年的订单</div>
			</div>
		)
	}
}
