import Tile from './Tile.jsx';

export default function Board({ size, tiles, gamePhase, onTileClick }) {
  function getGridGap(boardSize) {
    if (boardSize <= 3) return '1rem';
    if (boardSize <= 4) return '0.75rem';
    if (boardSize <= 5) return '0.5rem';
    if (boardSize <= 6) return '0.375rem';
    return '0.25rem';
  }

  function getBorderRadius(boardSize) {
    if (boardSize <= 3) return '0.5rem';
    if (boardSize <= 4) return '0.375rem';
    if (boardSize <= 5) return '0.25rem';
    if (boardSize <= 6) return '0.1875rem';
    return '0.125rem';
  }

  const gap = getGridGap(size);
  const borderRadius = getBorderRadius(size);

  return (
    <div
      className="grid w-[300px] h-[300px] md:w-[400px] md:h-[400px] 2xl:w-[500px] 2xl:h-[500px] mx-auto"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
        gap: gap,
      }}
    >
      {tiles.map((tile) => (
        <Tile
          key={tile.id}
          id={tile.id}
          isSelected={tile.isSelected}
          isCorrect={tile.isCorrect}
          gamePhase={gamePhase}
          borderRadius={borderRadius}
          onTileClick={onTileClick}
        />
      ))}
    </div>
  );
}