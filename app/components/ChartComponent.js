"use client";
import { useRef, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../dashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartComponent({ networkDetails }) {
  const chartRef = useRef(null);
  const [isChartMounted, setIsChartMounted] = useState(false);

  useEffect(() => {
    setIsChartMounted(true);
    return () => {
      if (chartRef.current?.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  if (!isChartMounted) return null;

  const chartData = {
    labels: networkDetails.map(gen => gen.gen || 'Unknown'),
    datasets: [{
      label: 'Sales (R)',
      data: networkDetails.map(gen => {
        const sales = gen.recruits?.reduce((sum, r) => {
          const sale = parseFloat(r.sales?.slice(1) || 0);
          return sum + (isNaN(sale) ? 0 : sale);
        }, 0);
        return isNaN(sales) ? 0 : sales;
      }),
      backgroundColor: '#6b21a8',
      borderColor: '#5b1d98',
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Network Sales by Generation' },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Sales (R)' } },
      x: { title: { display: true, text: 'Generation' } },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutBounce',
      from: { y: 0 },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Bar ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
}