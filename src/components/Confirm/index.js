/**
 * Created by vin on 2017/1/30.
 */

import React, { Component } from 'react'
import './index.css'

export default class ConfirmPage extends Component {
	render() {
		document.title = '下单成功'
		return (
			<div className="confirm">
				<img className="ok" src="" />
				<div>
					<strong>订单提交成功</strong>
					<div className="tip">
						<p>你的订单已提交 详情请查看订单</p>
						<p>&nbsp;</p>
						<p>如有任何问题，请联系客服</p>
						<p>客服电话：18316952809</p>
					</div>
				</div>
				<a href='#order' className="btn-check">
					查看订单
				</a>
				<div
					className="btn-confirm"
					onClick={() => window.WeixinJSBridge.invoke('closeWindow', {}, function(res) { })}>完成</div>
			</div>
		)
	}
}
