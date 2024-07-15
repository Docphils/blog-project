import { useEffect, useRef } from 'react';

function useTouchLeave(ref, onLeave) {
  const savedCallback = useRef(onLeave);

  useEffect(() => {
    savedCallback.current = onLeave;
  }, [onLeave]);

  useEffect(() => {
    const element = ref.current;
    let isMouseSensitive = true; // Flag to track mouse sensitivity

    function isTouchInsideElement(touch, element) {
      const rect = element.getBoundingClientRect();
      return (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      );
    }

    function handleTouchStart(event) {
      const touches = event.touches;

      if (!isMouseSensitive && touches.length === 1 && !isTouchInsideElement(touches[0], element)) {
        savedCallback.current();
      }
    }

    function checkForMouse() {
      isMouseSensitive = window.matchMedia('(pointer:fine)').matches; // Check for mouse support
    }

    // Initial check for mouse support
    checkForMouse();

    if ('ontouchstart' in window) {
      // Add touch event listener only if the device supports touch and doesn't have a mouse
      element.addEventListener('touchstart', handleTouchStart);
    }

    const mediaQuery = window.matchMedia('(pointer:fine)');
    mediaQuery.addEventListener('change', checkForMouse); // Listen for changes in mouse support

    return () => {
      if ('ontouchstart' in window) {
        // Remove touch event listener when unmounting or not on a touch-enabled device without mouse
        element.removeEventListener('touchstart', handleTouchStart);
      }
      mediaQuery.removeEventListener('change', checkForMouse); // Remove media query listener
    };
  }, [ref]);
}

export default useTouchLeave;
