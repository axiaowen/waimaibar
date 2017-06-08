/**
 * Created by vin on 2017/2/4.
 */

import React, {Component} from 'react'
import CartItemList from 'COMPONENT/CartItemList'
import './index.css'

export default class Name extends Component {
	constructor(props) {
		super(props)
		this.state = {
			remain: 10
		}
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			const remain = this.state.remain
			if (remain == 0) {
				window.location.href = '#order'
			}
			this.setState({remain: remain - 1})
		}, 1000)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	pay() {
		if (typeof WeixinJSBridge == 'undefined') {
			// TODO: log to the server
			if (document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', this.wepay, false)
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', this.wepay)
				document.attachEvent('onWeixinJSBridgeReady', this.wepay)
			}
		} else {
			this.wepay()
		}
	}

	wepay() {
		// TODO: Get the repay message
		const prepay = ''
		window.WeixinJSBridge.invoke(
			'getBrandWCPayRequest', {
				'appId': prepay.appId,
				'timeStamp': prepay.timeStamp,
				'nonceStr': prepay.nonceStr,
				'package': prepay.package,
				'signType': 'MD5',
				'paySign': prepay.paySign
			},
			function(res) {
				// TODO: log to the server
				if (res.err_msg == 'get_brand_wcpay_request:ok') {
					window.location.href = '#!/confirm'
				}
			})
	}

	render() {
		let minutes = parseInt(this.state.remain / 60, 0)
		let seconds = this.state.remain % 60
		let remain = `${minutes}:${seconds}`
		return (
			<div>
				<div className="order-section">
					<div className="pay-deadline-title">支付剩余时间</div>
					<div className="pay-deadline">{remain}</div>
					<div className="bottom-tip">请尽快支付订单</div>
				</div>
				<div className="order-section">
					<a href="#">
						<div className="order-section-title">
							如家快餐厅 <i className="arrow"></i>
						</div>
					</a>
					<div style={{padding: '0px 10px 10px 10px'}}>
						<CartItemList />
					</div>
				</div>
				<div className="btn-area">
					<div className="pay-btn-change">修改订单</div>
					<div className="pay-btn-cancel">取消订单</div>
				</div>
				<div
					className="btn-bottom"
					onClick={this.pay()}
				>立即支付</div>
			</div>
		)
	}
}
