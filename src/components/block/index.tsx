import React, {
	useRef,
	useEffect,
	useCallback,
	useMemo,
} from 'react';
import { TBlockProps } from '@/types';
import { Card } from '../ui/card';
import { Remover, ResizeHandler, UploadBtn } from './actions';
import { useDrag, useResize } from './utils';

/**
 * Ushbu komponent blokni tortish (drag), o'lchamini o'zgartirish (resize)
 * va tasvir yuklash funksiyalarini boshqaradi.
 */
export const Block: React.FC<TBlockProps> = ({
	data,
	updateBlock,
	removeBlock,
}) => {
	const blockRef = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Drag va resize xatti-harakatlarini boshqarish uchun custom hooklardan fodalanish.
	const { isDragging, handleDragStart, handleDragMove, handleDragEnd } =
		useDrag({ data, updateBlock });
	const { isResizing, handleResizeStart, handleResizeMove, handleResizeEnd } =
		useResize({ data, updateBlock });

	// Drag va resize jarayonlarini boshqarish uchun global event handlerlari.
	const handleGlobalMouseMove = useCallback(
		(e: MouseEvent) => {
			if (isDragging) handleDragMove(e);
			if (isResizing) handleResizeMove(e);
		},
		[isDragging, isResizing, handleDragMove, handleResizeMove]
	);

	const handleGlobalMouseUp = useCallback(() => {
		if (isDragging) handleDragEnd();
		if (isResizing) handleResizeEnd();
	}, [isDragging, isResizing, handleDragEnd, handleResizeEnd]);

	useEffect(() => {
		if (isDragging || isResizing) {
			window.addEventListener('mousemove', handleGlobalMouseMove);
			window.addEventListener('mouseup', handleGlobalMouseUp);
		}
		return () => {
			window.removeEventListener('mousemove', handleGlobalMouseMove);
			window.removeEventListener('mouseup', handleGlobalMouseUp);
		};
	}, [isDragging, isResizing, handleGlobalMouseMove, handleGlobalMouseUp]);

	const handleUploadClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const handleImageUpload = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (ev) => {
					if (ev.target?.result) {
						updateBlock({ ...data, image: ev.target.result as string });
					}
				};
				reader.readAsDataURL(file);
			}
		},
		[data, updateBlock]
	);

	const handleRemove = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			removeBlock(data.id);
		},
		[data, removeBlock]
	);

	// Keraksiz qayta render qilishni oldini olish uchun style ni memoize.
	const cardStyle = useMemo(
		() => ({
			left: data.x,
			top: data.y,
			width: data.width,
			height: data.height,
		}),
		[data.x, data.y, data.width, data.height]
	);

	return (
		<Card
			ref={blockRef}
			onMouseDown={handleDragStart}
			className='absolute overflow-hidden shadow-sm'
			style={cardStyle}
		>
			<div className='relative w-full h-full'>
				<Remover onClick={handleRemove} />

				{data.image ? (
					<img
						src={data.image}
						alt='Block'
						className='w-full h-full object-contain'
						draggable={false}
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center'>
						<UploadBtn onClick={handleUploadClick} />
					</div>
				)}
				<ResizeHandler onMouseDown={handleResizeStart} />
				<input
					type='file'
					ref={fileInputRef}
					accept='image/*'
					onChange={handleImageUpload}
					className='hidden'
				/>
			</div>
		</Card>
	);
};
