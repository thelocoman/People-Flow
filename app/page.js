"use client"

import { useState, useEffect, useCallback } from 'react';
import styles from "./page.module.css"; // Correct import for CSS Module

// --- Utility Functions for Countdown Timer Logic (REMAINS UNCHANGED) ---

const calculateTimeRemaining = (targetTime) => {
  const now = new Date().getTime();
  const distance = targetTime - now;

  if (distance < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, distance: -1 };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, distance };
};

const formatStepTime = (stepTime) => {
  const now = new Date().getTime();
  const stepTimeRemaining = stepTime - now;

  if (stepTimeRemaining < 0) {
    return '0h: 0m: 0s';
  }

  const hours = Math.floor(stepTimeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((stepTimeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((stepTimeRemaining % (1000 * 60)) / 1000);

  return `${hours}h: ${minutes}m: ${seconds}s`;
};


export default function Home() {

  // ... (STATE AND HOOKS REMAINS UNCHANGED) ...
  const GOAL_DATE = new Date("Oct 26, 2025 00:00:00").getTime();
  const STEP_DATE = new Date("Oct 14, 2025 21:00:00").getTime();

  const [goalTime, setGoalTime] = useState(calculateTimeRemaining(GOAL_DATE));
  const [stepTimers, setStepTimers] = useState(Array(5).fill(formatStepTime(STEP_DATE)));
  const [tasks, setTasks] = useState({
    task1: false, task2: false, task3: false, task4: false, task5: false,
  });

  const updateCountdown = useCallback(() => {
    setGoalTime(calculateTimeRemaining(GOAL_DATE));
    const newStepTimers = Array(5).fill().map(() => formatStepTime(STEP_DATE));
    setStepTimers(newStepTimers);
  }, [GOAL_DATE, STEP_DATE]);

  useEffect(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [updateCountdown]);

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setTasks(prevTasks => ({ ...prevTasks, [id]: checked }));
  };

  const checkboxData = [
    { id: 'task1', label: "" },
    { id: 'task2', label: "" },
    { id: 'task3', label: "" },
    { id: 'task4', label: "" },
    { id: 'task5', label: "" },
  ];

  const mainGoalContent = goalTime.distance < 0 ? (
    <div className={styles.message}>EXPIRED</div>
  ) : (
    <>
      <span className={styles.display}>{goalTime.days} <span className={styles['time-label']}>days </span></span>
      <span className={styles.display2}>{goalTime.hours} <span className={styles['time-label']}>hours </span></span>
      <span className={styles.display3}>{goalTime.minutes} <span className={styles['time-label']}>minutes </span></span>
      <span className={styles.display4}>{goalTime.seconds} <span className={styles['time-label']}>seconds </span></span>
    </>
  );

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.circle} ${styles.c1}`}></div>
        <div className={`${styles.circle} ${styles.c2}`}></div>
        <div className={`${styles.circle} ${styles.c3}`}></div>
      </div>

      <h1 className={styles.mainTitle}>
        <u>Taking the next step</u>
      </h1>

      <div className={styles.contentStyle}>
        <p className={styles.goalParagraph}>
          
        </p>

        {/* CHECKBOX */}
        <div className={styles.card}>
          <div className={styles['checkbox-list']}>
            {checkboxData.map((item, index) => (
              <div className={styles['list-item']} key={item.id}>
                <input
                  type="checkbox"
                  id={item.id}
                  checked={tasks[item.id]}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor={item.id}
                  className={tasks[item.id] ? styles['line-through'] : ''}
                >
                  <b>
                    <span id={`step${index + 1}`}>{stepTimers[index]}</span> | Step {index + 1}:
                  </b>
                  <span id={`thing${index + 1}`} className={styles.stylish}>
                    {item.label}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}