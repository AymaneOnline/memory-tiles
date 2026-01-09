export default function GameOverScreen({ level, highScore, onPlayAgain }) {
  return (
    <div className="text-white text-center">
      <img
        className="w-32 h-32 mx-auto mb-4"
        src="memory-tiles-logo.png"
        alt="Memory Tiles's logo"
      />
      <h1 className="text-7xl font-bold mb-1">Level {level}</h1 >
      <div className="inline-block px-4 py-1 mb-6 rounded-full bg-white/20 text-white text-lg font-semibold">
        🏆 High Score: Level {highScore}
      </div>
      <p className="mb-10 text-lg text-white">Visual Memory Game</p>
      <button
        onClick={onPlayAgain}
        className="text-xl font-bold bg-white text-black py-2 px-4 rounded cursor-pointer hover:bg-white/85 transition">
        Play Again
      </button>
    </div >
  );
}