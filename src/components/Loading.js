import React, { Component } from 'react'

// import '../styles/loading.less'

export default class Loading extends Component {
	render() {
		var style = {color: '#198774',
			fontSize: '12px',
				textAlign: 'center',
				position: 'absolute',
				width: '99%',
				top: '210'
    }
		return (
			<div>
				<div className='spinner'>
					<div className='rect1'></div>
					<div className='rect2'></div>
					<div className='rect3'></div>
					<div className='rect4'></div>
					<div className='rect5'></div>
				</div>
				<div style={style}>{this.props.content}</div>
			</div>
		)
	}
}
