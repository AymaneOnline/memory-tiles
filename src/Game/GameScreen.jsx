import { Heart } from 'lucide-react';
import Board from '../Board/Board.jsx';

export default function GameScreen({ level, lives, boardSize, tiles, gamePhase, onTileClick }) {
  return (
    <>
      <div className='mb-10 flex gap-8 text-2xl text-white font-medium'>
        <div className='flex gap-1'>
          <h2>Level</h2>
          <p>{level}</p>
        </div>
        <div className='flex justify-center items-center gap-2'>
          <h2>Lives</h2>
          <ul className='flex justify-center items-center gap-1'>
            {Array.from({ length: lives }).map((_, index) => (
              <li key={index}><Heart fill="white" /></li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <Board
          size={boardSize}
          tiles={tiles}
          gamePhase={gamePhase}
          onTileClick={onTileClick}
        />
      </div>
    </>
  );
}