import React from 'react'

import './ControlBlock.css'

const ControlBlock = () => (
	// const a = 1;
	// @ts-ignore
	<div className="main-panel">
		<button className="buttonSide btn-sm">
			<img className="buttonImg" src="./../../../public/eye.svg" />
		</button>
		<button className="btn buttonAdd btn-lg">Добавить блок</button>
		<button className="buttonSide btn-sm">
			<img className="buttonImg" src="./../../../public/settings.svg" />
		</button>
	</div>
)
export { ControlBlock }
