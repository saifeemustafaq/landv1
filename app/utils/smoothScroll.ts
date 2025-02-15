export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1200; // Increased duration for smoother feel

  let start: number | null = null;

  // Custom easing function that combines easeOutQuart with a gentle bounce
  const easeOutWithGentleBounce = (x: number): number => {
    // First, apply a smooth easeOutQuart
    const easeOut = 1 - Math.pow(1 - x, 4);
    
    // Then add a subtle bounce near the end
    if (x >= 0.8) {
      const bounceProgress = (x - 0.8) / 0.2;
      // Smaller amplitude (0.015) for gentler bounce
      return easeOut + Math.sin(bounceProgress * Math.PI) * 0.015 * Math.pow(1 - x, 2);
    }
    
    return easeOut;
  };

  const animation = (currentTime: number) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);

    const easeProgress = easeOutWithGentleBounce(progress);
    window.scrollTo({
      top: startPosition + distance * easeProgress,
      behavior: 'auto' // We're handling the smoothness ourselves
    });

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
}; 