import React, { useEffect, useRef } from 'react';

const BarDiagram = ({ data, labels }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const drawBars = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear the canvas
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set up bar styles
      ctx.fillStyle = '#07224A';
      const barWidth = 30;
      const spacing = 20;
      let x = 20;

      // Draw bars based on data
      data.forEach(value => {
        const barHeight = value * 5; // Adjust the scale as needed
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + spacing;
      });
    };

    drawBars();
  }, [data]);

  return (
    <div className='box'>
      <p>Diagramme Vente:</p>
      <canvas ref={canvasRef} width={400} height={130}></canvas>
      <p>Prix min Prix max Montant</p>
    </div>
  );
};

export default BarDiagram;
