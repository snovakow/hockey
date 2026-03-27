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
        if (showPopUp) {
            // Calculate scrollbar width to prevent layout shift
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            
            // Prevent background scrolling by disabling body overflow
            document.body.style.overflow = 'hidden';
            // Reserve space for scrollbar gutter
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
        } else {
            // Restore body scrolling and remove scrollbar gutter
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }

        return () => {
            // Cleanup: restore body overflow on unmount
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
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
