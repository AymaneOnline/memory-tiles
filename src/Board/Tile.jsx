export default function Tile({ id, isSelected, isCorrect, gamePhase, borderRadius, onTileClick }) {
  let tileColor = 'bg-green-400';

  if (gamePhase === 'memorization' && isCorrect) {
    tileColor = 'bg-white';
  }

  return (
    <div
      onClick={() => onTileClick(id)}
      className={`
        shadow-md flex justify-center items-center cursor-pointer ${tileColor}
        ${isSelected && isCorrect ? 'tile-flip' : ''} ${isSelected && !isCorrect ? 'tile-shake' : ''}
        `}
      style={{ borderRadius: borderRadius }}
    >
    </div>
  );
}