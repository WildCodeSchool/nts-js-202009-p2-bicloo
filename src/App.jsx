import React from 'react';
import styles from './css/app.module.css';
import StationsList from './components/StationsList';

function App() {
  return (
    <div className={styles.app}>
      <StationsList />
    </div>
  );
}
export default App;
