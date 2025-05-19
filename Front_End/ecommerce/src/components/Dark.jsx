import React, { useState } from 'react'

function Dark() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-vh-100 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>My React App</h2>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <p>This is an example of using Bootstrap dark mode in React.</p>
        
        <div className={`card p-3 mt-3 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
          <p>This card changes color based on the theme.</p>
        </div>
      </div>
    </div>
  );
}

export default Dark;
