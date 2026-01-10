import { useEffect, useState } from 'react';
import GameMenu from './GameMenu.jsx';
import GameScreen from './GameScreen.jsx';
import GameOverScreen from './GameOverScreen.jsx';
import FlashOverlay from './FlashOverlay.jsx';
import { playSound } from '../utils/sounds.js';

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [tiles, setTiles] = useState([]);
  const [gamePhase, setGamePhase] = useState('idle');
  const [lives, setLives] = useState(3);
  const [wrongSelections, setWrongSelections] = useState(0);
  const [flashType, setFlashType] = useState('normal');
  const [flashVisible, setFlashVisible] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const savedScore = localStorage.getItem('highScore');
    return savedScore ? parseInt(savedScore) : 0;
  });

  const boardSize = 3 + Math.floor(level / 3); // Increase size every 2 levels
  const correctCount = level + 2; // Increase correct tiles every level

  // Start the game
  function onStartGame() {
    setGameStarted(true);
    setGamePhase('gameStart');
    setAudioUnlocked(true);
  }

  // Start a new level
  function startLevel() {
    const totalTiles = boardSize * boardSize;
    const newTiles = Array.from({ length: totalTiles }, (_, index) => ({
      id: index,
      isSelected: false,
      isCorrect: false,
    }));
    let chosenIndexes = new Set();

    while (chosenIndexes.size < correctCount) {
      const randomIndex = Math.floor(Math.random() * totalTiles);
      chosenIndexes.add(randomIndex);
    }

    chosenIndexes.forEach(index => {
      newTiles[index].isCorrect = true;
    });

    setTiles(newTiles);
    setGamePhase('gameStart');
  }


  // Handle tile click
  function onTileClick(tileId) {
    if (gamePhase !== 'selection') return;

    const selectedTile = tiles.find(tile => tile.id === tileId);

    playSound(selectedTile.isCorrect ? 'correct' : 'wrong');

    if (selectedTile.isSelected) return;

    if (!selectedTile.isCorrect) setWrongSelections(prev => prev + 1);

    setTiles(prevTiles =>
      prevTiles.map(tile =>
        tile.id === tileId
          ? { ...tile, isSelected: true }
          : tile
      )
    );
  }


  // Reset game state
  function resetGame() {
    setLevel(1);
    setLives(3);
    setWrongSelections(0);
    setGamePhase('gameStart');
  }

  // Trigger flash effect
  function triggerFlash(type) {
    setFlashType(type);
    setFlashVisible(true);

    setTimeout(() => {
      setFlashVisible(false);
    }, 300); // short visible time

    setTimeout(() => {
      setFlashType(null);
    }, 1000); // AFTER fade-out
  }


  // Transition from game start to memorization phase
  useEffect(() => {
    if (gamePhase === 'gameStart') {
      const timeoutId = setTimeout(() => setGamePhase('memorization'), 1400);
      return () => clearTimeout(timeoutId);
    }
  }, [gamePhase]);


  // Play reveal sound on memorization phase
  useEffect(() => {
    if (!audioUnlocked) return;

    if (gamePhase === 'memorization') {
      playSound('reveal');
    }
  }, [gamePhase]);


  // Transition from memorization to selection phase
  useEffect(() => {
    if (gamePhase === 'memorization') {
      const timeoutId = setTimeout(() => setGamePhase('selection'), 1200);
      return () => clearTimeout(timeoutId);
    }
  }, [gamePhase]);


  useEffect(() => {
    if (!audioUnlocked) return;

    if (gamePhase === 'selection') {
      playSound('hide');
    }
  }, [gamePhase]);


  // Handle game start phase
  useEffect(() => {
    if (gamePhase === 'gameStart') {
      startLevel();
    }
  }, [gamePhase]);


  // Handle level completion
  useEffect(() => {
    if (gamePhase === 'completed') {
      const timeoutId = setTimeout(() => {
        setLevel(prev => prev + 1);
        setWrongSelections(0);
      }, 700);
      return () => clearTimeout(timeoutId);
    }
  }, [gamePhase]);

  useEffect(() => {
    if (gamePhase === 'completed') {
      startLevel();
    }
  }, [level]);


  // Handle failed phase
  useEffect(() => {
    if (gamePhase === 'failed') {
      const timeoutId = setTimeout(() => {
        setLives(prev => prev - 1);
        setWrongSelections(0);
        startLevel();
      }, 700);
      return () => clearTimeout(timeoutId);
    }
  }, [gamePhase]);


  // Change game phase to completed on all correct selections
  useEffect(() => {
    if (gamePhase === 'selection') {
      const totalCorrectSelection = tiles.filter(tile => tile.isCorrect && tile.isSelected).length;
      const totalCorrect = tiles.filter(tile => tile.isCorrect).length;

      if (totalCorrectSelection === totalCorrect) {
        const timeoutId = setTimeout(() => {
          setGamePhase('completed');
          triggerFlash('win');
        }, 300);
        return () => clearTimeout(timeoutId);
      }
    }

  }, [tiles, gamePhase]);


  // Play win sound on completed phase
  useEffect(() => {
    if (!audioUnlocked) return;

    if (gamePhase === 'completed') {
      playSound('success');
    }
  }, [gamePhase]);


  // Change game phase to failed on 3 wrong selections
  useEffect(() => {
    if (gamePhase === 'selection') {
      if (wrongSelections === 3) {
        const timeoutId = setTimeout(() => {
          setGamePhase('failed');
          triggerFlash('lose');
        }, 300);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [wrongSelections, gamePhase]);


  // Change game phase to game over on lives decrease to 0
  useEffect(() => {
    if (lives === 0) {
      setGamePhase('gameOver');
    }
  }, [lives]);


  // Update high score if level exceeds it
  useEffect(() => {
    if (level > highScore) {
      setHighScore(level);
      localStorage.setItem('highScore', level.toString());
    }
  }, [level, highScore]);


  return (
    <>
      <main className="h-svh bg-[#22C55E] flex flex-col justify-center items-center">
        <FlashOverlay type={flashType} visible={flashVisible} />
        {gamePhase === 'gameOver'
          ? (
            <GameOverScreen
              level={level}
              highScore={highScore}
              onPlayAgain={resetGame}
            />
          )
          : gameStarted === false
            ? (
              <GameMenu onStartGame={onStartGame} />
            )
            : (
              <GameScreen
                level={level}
                lives={lives}
                boardSize={boardSize}
                tiles={tiles}
                gamePhase={gamePhase}
                onTileClick={onTileClick}
              />
            )
        }
      </main>
    </>
  );
}