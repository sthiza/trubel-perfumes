"use client";
import { useEffect, useRef } from 'react';
import styles from '../dashboard.module.css';

export default function SimpleChart({ networkDetails }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const data = networkDetails.map(gen => ({
      label: gen.gen || 'Unknown',
      sales: gen.recruits?.reduce((sum, r) => sum + parseFloat(r.sales?.slice(1) || 0), 0) || 0,
    }));
    const barWidth = 80; // Wider bars for bigger canvas
    const maxSales = Math.max(...data.map(d => d.sales), 1000);
    const heightScale = 300 / maxSales; // Adjusted for 400px height

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    data.forEach((item, i) => {
      const x = i * (barWidth + 20) + 40; // More spacing
      const height = item.sales * heightScale;
      ctx.fillStyle = '#6b21a8';
      ctx.fillRect(x, 400 - height, barWidth, height); // Adjusted for 400px height
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.font = '16px Arial'; // Bigger text
      ctx.fillText(item.label, x + barWidth / 2, 420);
      ctx.fillText(`R${item.sales}`, x + barWidth / 2, 400 - height - 15);
    });
  }, [networkDetails]);

  return (
    <div className={styles.chartContainer}>
      <canvas ref={canvasRef} width="600" height="400"></canvas> {/* Bigger canvas */}
    </div>
  );
}