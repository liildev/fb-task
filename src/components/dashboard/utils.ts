import { MARGIN } from '@/constants';
import { TBlockData } from '@/types';

/**
 * Ikki blokning ustma-ust kelishini (margin bilan) tekshiradi.
 *
 * @param a - Birinchi blok
 * @param b - Ikkinchi blok
 * @param margin - Qabul qilinadigan qo'shimcha bo'shliq (default: MARGIN)
 * @returns {boolean} - Agar bloklar ustma-ust kelsa true, aks holda false.
 */
const isCollision = (
	a: TBlockData,
	b: TBlockData,
	margin: number = MARGIN
): boolean => {
	return !(
		a.x + a.width + margin <= b.x ||
		a.x >= b.x + b.width + margin ||
		a.y + a.height + margin <= b.y ||
		a.y >= b.y + b.height + margin
	);
};

/**
 * Bloklar o'rtasidagi to'qnashuvni hal qiladi.
 * Agar updatedBlock boshqa bloklar bilan ustma-ust kelsa, uni o'ngga siljitadi.
 *
 * @param updatedBlock - Yangilangan blok
 * @param others - Boshqa bloklar ro'yxati
 * @param margin - Margin (default: MARGIN)
 * @returns {TBlockData} - To'qnashuvdan keyin tuzatilgan blok
 */
export const resolveCollision = (
	updatedBlock: TBlockData,
	others: TBlockData[],
	margin: number = MARGIN
): TBlockData => {
	const newBlock = { ...updatedBlock };
	let collisionFound = true;
	let attempts = 0;

	while (collisionFound && attempts < 100) {
		collisionFound = false;
		for (const block of others) {
			if (isCollision(newBlock, block, margin)) {
				newBlock.x = block.x + block.width + margin;
				collisionFound = true;
			}
		}
		attempts++;
	}
	return newBlock;
};
