import { useRef, useEffect } from 'react';

const HexagonCanvas = () => {
    // useRef provides a persistent reference to the canvas element
    const canvasRef = useRef(null);

    // useEffect handles all the side effects like DOM manipulation and event listeners
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let mouseX = 0;
        let mouseY = 0;
        let touchX = 0;
        let touchY = 0;

        const baseSaturation = 80;
        const minHexagonSize = 40;
        const maxHexagonSize = 30;
        const minLineWidth = 2;
        const maxLineWidth = 4;
        const hexagonSpacing = 80;
        const effectRadius = 200;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            touchX = touch.clientX;
            touchY = touch.clientY;
            e.preventDefault();
        };

        const drawBackground = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const currentX = mouseX || touchX;
            const currentY = mouseY || touchY;
            const baseHue = (Date.now() / 50) % 360;
            const halfHexagonSpacing = hexagonSpacing / 2;

            for (let y = 0; y < canvas.height + hexagonSpacing; y += hexagonSpacing) {
                const isEvenRow = Math.floor(y / hexagonSpacing) % 2 === 0;
                const xOffset = isEvenRow ? 0 : halfHexagonSpacing;

                for (let x = xOffset; x < canvas.width + hexagonSpacing; x += hexagonSpacing) {
                    const distance = Math.hypot(x - currentX, y - currentY);
                    const normalizedDistance = Math.min(distance, effectRadius) / effectRadius;
                    const hueOffset = (1 - normalizedDistance) * 60;
                    const finalHue = (baseHue + hueOffset) % 360;
                    const finalLightness = 70 - (1 - normalizedDistance) * 30;
                    const scalingFactor = Math.pow(1 - normalizedDistance, 1.5);
                    const currentHexagonSize = minHexagonSize + scalingFactor * (maxHexagonSize - minHexagonSize);
                    const currentLineWidth = minLineWidth + scalingFactor * (maxLineWidth - minLineWidth);

                    ctx.strokeStyle = `hsl(${finalHue}, ${baseSaturation}%, ${finalLightness}%)`;
                    ctx.lineWidth = currentLineWidth;
                    ctx.lineCap = 'round';

                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        const angle = (i * Math.PI / 3) + (Math.PI / 6);
                        const drawX = x + currentHexagonSize * Math.cos(angle);
                        const drawY = y + currentHexagonSize * Math.sin(angle);
                        if (i === 0) {
                            ctx.moveTo(drawX, drawY);
                        } else {
                            ctx.lineTo(drawX, drawY);
                        }
                    }
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        };

        let animationFrameId;
        const animate = () => {
            drawBackground();
            animationFrameId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleTouchMove);

        animate();

        // This is the cleanup function that runs when the component unmounts
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <canvas
            ref={canvasRef}
            id="interactiveCanvas"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                pointerEvents: 'none' // Ensures the canvas doesn't block other elements
            }}
        />
    );
};

export default HexagonCanvas;