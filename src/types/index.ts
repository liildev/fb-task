export type TBlockData = {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  image?: string;
}

export type TBlockProps = {
	data: TBlockData;
	updateBlock: (block: TBlockData) => void;
	removeBlock: (id: string) => void;
};
