import React, { useState, useRef } from 'react';
import Block, { BlockData } from './block';

interface DashboardProps {
	isSaved: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isSaved }) => {
	const [blocks, setBlocks] = useState<BlockData[]>([]);
	const dashboardRef = useRef<HTMLDivElement>(null);

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();

		// Get block type from dataTransfer
		const blockType = event.dataTransfer.getData('block-type');
		const rect = dashboardRef.current?.getBoundingClientRect();

		// Calculate drop position relative to the dashboard
		const x = event.clientX - (rect?.left || 0);
		const y = event.clientY - (rect?.top || 0);

		// Create a new block
		const newBlock: BlockData = {
			id: Date.now(), // unique ID
			type: blockType,
			x,
			y,
			width: 200, // initial width
			height: 100, // initial height
			content: blockType === 'text' ? 'Your text here' : '',
			imageUrl: '',
		};

		setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	// Function to update block data (position, size, content, etc.)
	const updateBlock = (updatedBlock: BlockData) => {
		setBlocks((prevBlocks) =>
			prevBlocks.map((block) =>
				block.id === updatedBlock.id ? updatedBlock : block
			)
		);
	};

	// Function to remove a block
	const removeBlock = (id: number) => {
		setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
	};

	return (
		<div
			ref={dashboardRef}
			className='relative w-full h-full'
			onDrop={handleDrop}
			onDragOver={handleDragOver}
		>
			{/* Render all blocks */}
			{blocks.map((block) => (
				<Block
					key={block.id}
					data={block}
					isSaved={isSaved}
					onUpdate={updateBlock}
					onRemove={removeBlock}
				/>
			))}
		</div>
	);
};

export default Dashboard;
