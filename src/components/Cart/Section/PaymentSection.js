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
		const { payments } = this.props
		return (
			<div className="section">
				<div className="section-title" style={{paddingTop: 8}}>
					支付方式
				</div>
				<div className="section-body" style={{height: 50}}>
					{payments.map((payment) =>
						<div style={{padding: '2px 0', color: (paytype == payment.id ? '#198774' : '#aaa')}}
								onClick={() => {
									if (payment.is_valid) {
										this.setState({paytype: payment.id})
									}
								}}>
							<div className='checkbox'>
								<input type='checkbox' checked={paytype == payment.id} />
								<label for='checkbox'
										style={{background: paytype == payment.id ? '#198774' : '#e5ecec'}}></label>
							</div>
							<div style={{margin: '2px 0px'}}>
								{payment.is_avaliable
									? <div>
											{payment.name}
											<small>{payment.desc}</small>
										</div>
									: <s>
											{payment.name}
											<small>{payment.desc}</small>
										</s>}
							</div>
						</div>)}
				</div>
			</div>
		)
	}
}
