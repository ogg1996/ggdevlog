import { getBoard } from '@/api/fetch';
import { Board } from '@/components/common/types/types';
import { create } from 'zustand';

interface BoardState {
  boardList: Board[] | null;
  fetchBoardList: () => Promise<void>;
}

const useBoardStore = create<BoardState>(set => ({
  boardList: null,
  fetchBoardList: async () => {
    const data = await getBoard();
    set({ boardList: data });
  }
}));

export default useBoardStore;
