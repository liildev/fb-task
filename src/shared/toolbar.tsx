import React from 'react';


const Toolbar: React.FC = () => {
	// For simplicity, let’s have two “types” of blocks: a text block & an image block
	// We'll rely on HTML5 drag-and-drop dataTransfer to identify the type.
	const handleDragStart = (
		event: React.DragEvent<HTMLDivElement>,
		blockType: string
	) => {
		event.dataTransfer.setData('block-type', blockType);
	};

	return (
		<div className='space-y-4'>
			<div
				draggable
				onDragStart={(e) => handleDragStart(e, 'text')}
				className='cursor-move bg-white p-2 border rounded shadow hover:bg-gray-100'
			>
				Text Block
			</div>
			<div
				draggable
				onDragStart={(e) => handleDragStart(e, 'image')}
				className='cursor-move bg-white p-2 border rounded shadow hover:bg-gray-100'
			>
				Image Block
			</div>
		</div>
	);
};

export default Toolbar;
