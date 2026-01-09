export default function FlashOverlay({ type, visible }) {
  return (
    <div
      className={`
        fixed inset-0 pointer-events-none
        transition-opacity duration-1000 ease-out
        ${type === 'win' ? 'bg-white' : ''}
        ${type === 'lose' ? 'bg-red-700' : ''}
        ${visible ? 'opacity-60' : 'opacity-0'}
    `}>
    </div>
  );
}