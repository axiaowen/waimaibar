/**
 * Created by vin on 2017/2/3.
 */

import React, { Component } from 'react'

export default class Address extends Component {
	constructor(props) {
		super(props)
		this.state = {
			paytype: 0
		}
	}
	render() {
		const { paytype } = this.state
		const payments = [{name: '微信支付', isValid: true}]
		return (
			<div className="section">
				<div className="section-title">
					支付方式
				</div>
				<div className="section-body">
					{false
						? payments.map((payment) =>
							<div
								style={{padding: '2px 0', color: (paytype == payment.id ? '#198774' : '#aaa')}}
								onClick={() => {
									if (payment.is_valid) {
										this.setState({paytype: payment.id})
									}
								}}>
								<div className='checkbox'>
									<input type='checkbox' checked={paytype == payment.id} />
									<label
										for='checkbox'
										style={{background: paytype == payment.id ? '#198774' : '#e5ecec'}}></label>
								</div>
								<div style={{margin: '2px 0px'}}>
									{payment.isValid
										? <div>
											{payment.name}
											<small>{payment.desc}</small>
										</div>
										: <s>
											{payment.name}
											<small>{payment.desc}</small>
										</s>}
								</div>
							</div>)
						: <div
								style={{padding: '8px 0', color: '#198774'}}>
								<div className='checkbox'>
									<input type='checkbox' checked={true} />
									<label
										for='checkbox'
										style={{background: '#198774'}}></label>
								</div>
								<div style={{margin: '2px 0px'}}>
									货到付款
								</div>
							</div>}
				</div>
			</div>
		)
	}
}
