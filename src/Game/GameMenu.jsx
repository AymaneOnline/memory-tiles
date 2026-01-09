export default function GameMenu({ onStartGame }) {
  return (
    <div className="text-white text-center">
      <img
        className="w-32 h-32 mx-auto mb-4"
        src="memory-tiles-logo.png"
        alt="Memory Tiles's logo"
      />
      <h1 className="text-7xl font-bold mb-1">Memory Tiles</h1 >
      <p className="mb-10 text-lg text-white">Visual Memory Game</p>
      <button
        onClick={onStartGame}
        className="text-xl font-bold bg-white text-black py-2 px-4 rounded cursor-pointer hover:bg-white/85 transition">
        Start
      </button>
    </div >
  );
}