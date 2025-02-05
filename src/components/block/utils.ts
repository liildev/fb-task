import { TBlockProps } from '@/types';
import { useState, useCallback } from 'react';

const MIN_SIZE = 50;

/**
 * Drag logikasini boshqarish uchun custom hook.
 * Drag holati va event handlerlarini kapsulalaydi.
 */
export const useDrag = ({
	data,
	updateBlock,
}: {
	data: TBlockProps['data'];
	updateBlock: (data: TBlockProps['data']) => void;
}) => {
	const [isDragging, setIsDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

	const handleDragStart = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			setIsDragging(true);
			setDragOffset({ x: e.clientX - data.x, y: e.clientY - data.y });
		},
		[data]
	);

	const handleDragMove = useCallback(
		(e: MouseEvent) => {
			if (!isDragging) return;
			const newX = e.clientX - dragOffset.x;
			const newY = e.clientY - dragOffset.y;
			updateBlock({ ...data, x: newX, y: newY });
		},
		[isDragging, dragOffset, data, updateBlock]
	);

	const handleDragEnd = useCallback(() => {
		setIsDragging(false);
	}, []);

	return { isDragging, handleDragStart, handleDragMove, handleDragEnd };
};

/**
 * O'lchamini o'zgartirish logikasini boshqarish uchun custom hook.
 * O'lcham o'zgarishi holati va xatti-harakatlarini ajratib beradi.
 */
export const useResize = ({
	data,
	updateBlock,
}: {
	data: TBlockProps['data'];
	updateBlock: (data: TBlockProps['data']) => void;
}) => {
	const [isResizing, setIsResizing] = useState(false);
	const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
	const [initialSize, setInitialSize] = useState({
		width: data.width,
		height: data.height,
	});

	const handleResizeStart = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			setIsResizing(true);
			setResizeStart({ x: e.clientX, y: e.clientY });
			setInitialSize({ width: data.width, height: data.height });
		},
		[data]
	);

	const handleResizeMove = useCallback(
		(e: MouseEvent) => {
			if (!isResizing) return;
			const deltaX = e.clientX - resizeStart.x;
			const deltaY = e.clientY - resizeStart.y;
			updateBlock({
				...data,
				width: Math.max(MIN_SIZE, initialSize.width + deltaX),
				height: Math.max(MIN_SIZE, initialSize.height + deltaY),
			});
		},
		[isResizing, resizeStart, initialSize, data, updateBlock]
	);

	const handleResizeEnd = useCallback(() => {
		setIsResizing(false);
	}, []);

	return { isResizing, handleResizeStart, handleResizeMove, handleResizeEnd };
};
