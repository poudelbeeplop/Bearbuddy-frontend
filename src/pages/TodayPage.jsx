import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredSession } from '../services/authService';
import { ROUTES } from '../constants/routes';

export default function TodayPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('bearbuddy_today_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Database Systems', location: 'Baldwin Hall · Room 544', time: '10:30 AM', note: '4 min walk from previous class' },
      { id: 2, title: 'Senior Design I', location: 'Rhodes Hall · Room 801', time: '1:00 PM', note: '5 min walk from previous class' }
    ];
  });
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    localStorage.setItem('bearbuddy_today_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const todayString = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).toUpperCase();

  const session = getStoredSession();
  const rawEmail = session?.user?.email || session?.email || 'poudel.bee@gmail.com';
  const cleanName = rawEmail.split('@')[0].split('.')[0];
  const capitalizedUser = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setTasks([...tasks, { 
      id: Date.now(), 
      title: inputVal.trim(), 
      location: 'Custom Note / Event', 
      time: 'Today', 
      note: 'Added to your daily schedule' 
    }]);
    setInputVal('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div style={styles.container}>
      {/* Header Greeting */}
      <div style={styles.topHeader}>
        <span style={styles.dateLabel}>{todayString}</span>
        <h1 style={styles.greeting}>Morning, {capitalizedUser}.</h1>
        <p style={styles.subGreeting}>Your campus plan for today is ready.</p>
      </div>

      {/* Hero "Up Next" Card from Figma Design */}
      <div style={styles.heroCard}>
        <div style={styles.heroHeader}>
          <span style={styles.upNextTag}>UP NEXT · 9:00 AM</span>
          <span style={styles.timeBadge}>In 20 min</span>
        </div>

        <h2 style={styles.classTitle}>Algorithms</h2>
        <p style={styles.classMeta}>CS 4071 · Old Chemistry · Room 601</p>

        <div style={styles.walkMeta}>
          <span style={styles.walkIcon}>👟</span>
          <div>
            <div style={styles.walkText}>Leave by 8:49 AM</div>
            <div style={styles.walkSubText}>6 min walk + 5 min to settle in</div>
          </div>
        </div>

        <button 
          onClick={() => navigate(ROUTES.MAP)} 
          style={styles.heroButton}
        >
          Get to class <span style={{ marginLeft: '6px' }}>↗</span>
        </button>
      </div>
      <form onSubmit={handleAddTask} style={styles.form}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Add class, note, or task..."
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>Add</button>
      </form>

      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>The rest of your day</h2>
        <span style={styles.scheduleLink} onClick={() => navigate(ROUTES.SCHEDULE)}>
          Schedule →
        </span>
      </div>

      <div style={styles.listContainer}>
        {tasks.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>No upcoming items. Type above to add one!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} style={styles.taskCard}>
              <div style={styles.timeCol}>{task.time}</div>
              <div style={styles.infoCol}>
                <div style={styles.taskTitle}>{task.title}</div>
                <div style={styles.taskLocation}>{task.location}</div>
                {task.note && <div style={styles.taskNote}>{task.note}</div>}
              </div>
              <button 
                onClick={() => handleDeleteTask(task.id)} 
                style={styles.deleteButton}
                aria-label="Delete item"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    boxSizing: 'border-box',
    overflowY: 'auto',
    backgroundColor: '#000000',
    color: '#ffffff',
  },
  topHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  dateLabel: {
    fontSize: '0.68rem',
    fontWeight: '700',
    color: '#8e8e93',
    letterSpacing: '0.8px',
    marginBottom: '2px',
  },
  greeting: {
    fontSize: '1.45rem',
    fontWeight: '800',
    margin: '0 0 2px 0',
    color: '#ffffff',
  },
  subGreeting: {
    fontSize: '0.82rem',
    color: '#a1a1aa',
    margin: 0,
  },
  heroCard: {
    backgroundColor: '#151518',
    borderRadius: '18px',
    padding: '16px',
    border: '1px solid #27272a',
    marginBottom: '18px',
    display: 'flex',
    flexDirection: 'column',
  },
  heroHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  upNextTag: {
    fontSize: '0.65rem',
    fontWeight: '700',
    color: '#a1a1aa',
    letterSpacing: '0.5px',
  },
  timeBadge: {
    backgroundColor: 'rgba(224, 1, 34, 0.15)',
    color: '#ff4d6d',
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '12px',
  },
  classTitle: {
    fontSize: '1.35rem',
    fontWeight: '800',
    margin: '0 0 2px 0',
    color: '#ffffff',
  },
  classMeta: {
    fontSize: '0.8rem',
    color: '#a1a1aa',
    margin: '0 0 14px 0',
  },
  walkMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#000000',
    padding: '10px 12px',
    borderRadius: '12px',
    marginBottom: '14px',
    border: '1px solid #27272a',
  },
  walkIcon: {
    fontSize: '1rem',
  },
  walkText: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#ffffff',
  },
  walkSubText: {
    fontSize: '0.72rem',
    color: '#71717a',
  },
  heroButton: {
    width: '100%',
    height: '40px',
    backgroundColor: '#e00122',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '0.88rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    gap: '8px',
    marginBottom: '18px',
  },
  input: {
    flex: 1,
    height: '40px',
    backgroundColor: '#151518',
    border: '1px solid #27272a',
    borderRadius: '10px',
    padding: '0 12px',
    color: '#ffffff',
    fontSize: '0.85rem',
    outline: 'none',
  },
  addButton: {
    height: '40px',
    padding: '0 16px',
    backgroundColor: '#e00122',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  sectionTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    margin: 0,
    color: '#ffffff',
  },
  scheduleLink: {
    fontSize: '0.78rem',
    color: '#e00122',
    fontWeight: '600',
    cursor: 'pointer',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingBottom: '20px',
  },
  emptyState: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#151518',
    borderRadius: '14px',
    border: '1px dashed #27272a',
  },
  emptyText: {
    color: '#71717a',
    fontSize: '0.8rem',
    margin: 0,
  },
  taskCard: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#151518',
    padding: '12px 14px',
    borderRadius: '14px',
    border: '1px solid #27272a',
  },
  timeCol: {
    width: '60px',
    fontSize: '0.78rem',
    fontWeight: '800',
    color: '#ffffff',
  },
  infoCol: {
    flex: 1,
    paddingRight: '8px',
  },
  taskTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#ffffff',
  },
  taskLocation: {
    fontSize: '0.75rem',
    color: '#71717a',
  },
  taskNote: {
    fontSize: '0.72rem',
    color: '#e00122',
    marginTop: '2px',
  },
  deleteButton: {
    background: 'transparent',
    border: 'none',
    color: '#52525b',
    fontSize: '0.9rem',
    cursor: 'pointer',
    padding: '4px',
  },
};