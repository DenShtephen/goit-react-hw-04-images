import { useEffect } from 'react';

export function Modal(props) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      props.onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={props.largeImageUrl} alt="" />
      </div>
    </div>
  );
}
