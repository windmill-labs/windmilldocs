import React from 'react';
import ModalVideo from 'react-modal-video';
import './VideoPlayer.css';

export default class VideoPlayer extends React.Component
{
	constructor()
	{
		super();
		this.state = {
			isOpen: false
		};
		this.openModal = this.openModal.bind(this);
	}

	openModal()
	{
		this.setState({ isOpen: true });
	}

	render()
	{
		return (
			<React.Fragment>
				<ModalVideo
					channel="youtube"
					isOpen={this.state.isOpen}
					videoId="PTEtQChlJ64"
					onClose={() => this.setState({ isOpen: false })}
				/>
				<div className='w-full h-full cursor-pointer' onClick={this.openModal}>
					<div className="opacity-0 hover:opacity-30 opacity-70 duration-300 absolute inset-0 z-10 flex justify-center items-center text-5xl text-blue-600 font-light font-mono">
						<span className='border-4 p-2 border-solid border-blue-600'>Watch demo</span></div>
					{this.props.children}</div>
			</React.Fragment >
		);
	}
}
