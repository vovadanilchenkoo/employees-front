import React from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'
import './Notification.sass'

const Notification = (props) => (
	<CSSTransition
		in={props.show}
		timeout={5000}
		mountOnEnter
		unmountOnExit
	>
		<div className="notification">
			{props.value}
		</div>
	</CSSTransition>
)

export default Notification