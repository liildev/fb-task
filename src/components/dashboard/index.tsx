import { useState, useCallback } from 'react';
import { TBlockData } from '@/types';
import { Block } from '../block';
import { MARGIN } from '@/constants';
import { resolveCollision } from './utils';

/**
 * Ushbu komponent bloklarni boshqaradi: blok qo'shish, yangilash va o'chirish.
 */
export const Dashboard: React.FC = () => {
	const [blocks, setBlocks] = useState<TBlockData[]>([]);

	/**
	 * Dashboard ustiga yangi blok tushirilganda ishga tushadi.
	 * Blokning to'g'ri joylashishi uchun to'qnashuvlar hal qilinadi.
	 */
	const handleDrop = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			const blockType = e.dataTransfer.getData('blockType');
			const rect = e.currentTarget.getBoundingClientRect();
			const posX = e.clientX - rect.left;
			const posY = e.clientY - rect.top;

			// Yangi blok obyektini yaratamiz.
			let newBlock: TBlockData = {
				id: Date.now().toString(),
				type: blockType,
				x: posX,
				y: posY,
				width: 200,
				height: 150,
				image: '',
			};

			newBlock = resolveCollision(newBlock, blocks, MARGIN);

			setBlocks((prev) => [...prev, newBlock]);
		},
		[blocks]
	);

	/**
	 * Drag over voqeasini oldini oladi.
	 */
	const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	}, []);

	/**
	 * Blok ma'lumotlarini yangilaydi va to'qnashuvlarni hal qiladi.
	 *
	 * @param updatedBlock - Yangilangan blok
	 */
	const updateBlock = useCallback((updatedBlock: TBlockData) => {
		setBlocks((prev) => {
			const others = prev.filter((b) => b.id !== updatedBlock.id);
			const resolvedBlock = resolveCollision(updatedBlock, others, MARGIN);
			return prev.map((block) =>
				block.id === updatedBlock.id ? resolvedBlock : block
			);
		});
	}, []);

	/**
	 * Berilgan id ga ega blokni olib tashlaydi.
	 *
	 * @param id - O'chiriladigan blokning id-si
	 */
	const removeBlock = useCallback((id: string) => {
		setBlocks((prev) => prev.filter((block) => block.id !== id));
	}, []);

	return (
		<main
			className='flex flex-1 overflow-auto relative'
			onDrop={handleDrop}
			onDragOver={handleDragOver}
		>
			{blocks.map((block) => (
				<Block
					key={block.id}
					data={block}
					updateBlock={updateBlock}
					removeBlock={removeBlock}
				/>
			))}
		</main>
	);
};
