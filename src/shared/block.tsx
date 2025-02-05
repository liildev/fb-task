import React, { useState, useRef, useEffect } from 'react';

export interface BlockData {
	id: number;
	type: string; // 'text' or 'image'
	x: number;
	y: number;
	width: number;
	height: number;
	content: string; // for text blocks
	imageUrl: string; // for image blocks
}

interface BlockProps {
	data: BlockData;
	isSaved: boolean;
	onUpdate: (block: BlockData) => void;
	onRemove: (id: number) => void;
}

const Block: React.FC<BlockProps> = ({ data, onUpdate, onRemove, isSaved }) => {
	const blockRef = useRef<HTMLDivElement>(null);

	// Local states to track dragging
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState<{
		offsetX: number;
		offsetY: number;
	}>({ offsetX: 0, offsetY: 0 });

	// Local states to track resizing
	const [isResizing, setIsResizing] = useState(false);
	const [resizeStart, setResizeStart] = useState<{
		mouseX: number;
		mouseY: number;
	}>({ mouseX: 0, mouseY: 0 });
	const [initialSize, setInitialSize] = useState<{
		width: number;
		height: number;
	}>({
		width: data.width,
		height: data.height,
	});

	// Handle mouse down on block for dragging
	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (isSaved) return; // disable dragging if saved

		// If user clicked on the resize handle, do not start dragging
		const target = e.target as HTMLElement;
		if (target.classList.contains('resize-handle')) {
			return;
		}

		setIsDragging(true);
		setDragStart({
			offsetX: e.clientX - data.x,
			offsetY: e.clientY - data.y,
		});
	};

	// Handle mouse move for dragging or resizing
	const handleMouseMove = (e: MouseEvent) => {
		if (isDragging) {
			onUpdate({
				...data,
				x: e.clientX - dragStart.offsetX,
				y: e.clientY - dragStart.offsetY,
			});
		} else if (isResizing) {
			const deltaX = e.clientX - resizeStart.mouseX;
			const deltaY = e.clientY - resizeStart.mouseY;
			onUpdate({
				...data,
				width: initialSize.width + deltaX,
				height: initialSize.height + deltaY,
			});
		}
	};

	// Handle mouse up for stopping drag/resize
	const handleMouseUp = () => {
		if (isDragging) {
			setIsDragging(false);
		}
		if (isResizing) {
			setIsResizing(false);
		}
	};

	// Setup global listeners for mouse move & mouse up
	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	});

	// Start resizing
	const startResizing = (e: React.MouseEvent<HTMLDivElement>) => {
		if (isSaved) return; // disable resizing if saved

		setIsResizing(true);
		setResizeStart({ mouseX: e.clientX, mouseY: e.clientY });
		setInitialSize({ width: data.width, height: data.height });
	};

	// Handle text changes
	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		onUpdate({
			...data,
			content: e.target.value,
		});
	};

	// Handle image URL changes
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onUpdate({
			...data,
			imageUrl: e.target.value,
		});
	};

	// Inline styles for the block’s position & size
	const style: React.CSSProperties = {
		position: 'absolute',
		left: data.x,
		top: data.y,
		width: data.width,
		height: data.height,
		border: '1px solid #ccc',
		backgroundColor: '#fff',
		boxSizing: 'border-box',
		padding: '8px',
		overflow: 'auto',
	};

	return (
		<div
			ref={blockRef}
			style={style}
			onMouseDown={handleMouseDown}
			className='shadow-md'
		>
			{/* Remove Button (show only if not saved) */}
			{!isSaved && (
				<button
					onClick={() => onRemove(data.id)}
					className='absolute top-1 right-1 bg-red-500 text-white px-1 rounded'
				>
					X
				</button>
			)}

			{/* Block Content */}
			{data.type === 'text' && (
				<textarea
					className='w-full h-full resize-none'
					value={data.content}
					disabled={isSaved}
					onChange={handleTextChange}
				/>
			)}
			{data.type === 'image' && (
				<div className='w-full h-full flex flex-col'>
					{!isSaved && (
						<input
							type='text'
							placeholder='Enter image URL...'
							value={data.imageUrl}
							onChange={handleImageChange}
							className='mb-2 border p-1'
						/>
					)}
					{data.imageUrl && (
						<img
							src={data.imageUrl}
							alt='Block'
							className='object-contain w-full h-full'
						/>
					)}
				</div>
			)}

			{/* Resize Handle (bottom-right corner) */}
			{!isSaved && (
				<div
					onMouseDown={startResizing}
					className='resize-handle absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize'
				/>
			)}
		</div>
	);
};

export default Block;
