import React, { Component } from 'react'

class Modal extends Component {
  constructor() {
    super()
    this.state = {
      autoHeight: false,
      width: 200,
    }
  }

  render() {
    const { children, autoHeight, width, title, displayTitle, subTitle, hasClose } = this.props
    return (
      <div className="modal-container">
        <div className={`modal-wrapper ${autoHeight && 'auto-height'}`} style={{ width: width || this.state.width }}>
          {displayTitle && (
            <div className="modal-header">
              <h2>{title}</h2>
              <h3>{subTitle}</h3>
            </div>
          )}
          {hasClose && (
            <div className="modal-close">
              <i className="phxico phx-close" title="Close Modal" />
            </div>
          )}
          <div className="modal-main">{children}</div>
        </div>
      </div>
    )
  }
}

export default Modal
