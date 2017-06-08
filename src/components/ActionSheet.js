import React, { Component } from 'react'

import './actionsheet.less'
// import './mask.less'

export default class ActionSheet extends Component {
  render() {
    var { show, onClose } = this.props
    return (
      <div>
        <div className={`mask_transition 
											 ${show ? 'mask_fade_toggle' : ''}`}
            style={{display: show ? 'block' : 'none'}} 
            onClick={onClose}></div>
        <div className={`actionsheet 
											 ${show ? 'actionsheet_toggle' : ''}`}
						style={{display: show ? 'block' : 'none'}}>
          <div className='actionsheet_menu' 
								style={{color: '#198774', textAlign: 'center', 
												fontSize: '16px'}}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

