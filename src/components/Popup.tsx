import { useRef, useEffect, type ReactNode } from 'react';
import './Popup.css';

interface PopupProps {
    showPopUp: boolean;
    closePopUp: () => void;
    children: ReactNode;
}

function Popup({ showPopUp, closePopUp, children }: PopupProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!showPopUp || !overlayRef.current) return;

        const preventBackgroundScroll = (e: Event) => {
            // Only prevent scroll if the event target is the overlay itself (the dark background)
            // Allow scroll if it's on the popup content or its children
            if (e.target === overlayRef.current) {
                e.preventDefault();
            }
        };

        const overlay = overlayRef.current;
        overlay.addEventListener('touchmove', preventBackgroundScroll, { passive: false });
        overlay.addEventListener('wheel', preventBackgroundScroll, { passive: false });

        return () => {
            overlay.removeEventListener('touchmove', preventBackgroundScroll);
            overlay.removeEventListener('wheel', preventBackgroundScroll);
        };
    }, [showPopUp]);

    if (!showPopUp) {
        return null;
    }

    return (
        <div
            ref={overlayRef}
            className="popup-overlay"
            onClick={closePopUp}
        >
            <div
                className="popup-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="popup-header">
                    Stats
                    <button className="close-button" onClick={closePopUp}>
                        &times;
                    </button>
                </div>
                <div className="popup-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Popup;
