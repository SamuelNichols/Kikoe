import { useAppConfigStore } from '../store/app_config/store';

export const ThemeToggle = () => {
  const theme = useAppConfigStore(s => s.theme);
  const toggleTheme = useAppConfigStore(s => s.toggleTheme);
  
  return (
    <button onClick={toggleTheme} style={{ fontSize: '1.2rem' }}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
