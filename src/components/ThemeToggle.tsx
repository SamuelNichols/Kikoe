import { useStore } from '../store';

export const ThemeToggle = () => {
  const theme = useStore(s => s.theme);
  const toggleTheme = useStore(s => s.toggleTheme);
  
  return (
    <button onClick={toggleTheme} style={{ fontSize: '1.2rem' }}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
