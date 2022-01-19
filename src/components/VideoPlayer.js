import React from 'react';
import ModalVideo from 'react-modal-video';
import './VideoPlayer.css';

export default class VideoPlayer extends React.Component {
	constructor() {
		super();
		this.state = {
			isOpen: false
		};
		this.openModal = this.openModal.bind(this);
	}

	openModal() {
		this.setState({ isOpen: true });
	}

	render() {
		return (
			<React.Fragment>
				<ModalVideo
					channel="youtube"
					isOpen={this.state.isOpen}
					videoId="PgClR6EoDvE"
					onClose={() => this.setState({ isOpen: false })}
				/>
				<div onClick={this.openModal}>{this.props.children}</div>
			</React.Fragment>
		);
	}
}
