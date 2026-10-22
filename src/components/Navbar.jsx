import PillNav from './PillNav';
import { ROUTES } from '../constants/routes.js';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <div style={styles.navContainer}>
      <PillNav
        items={[
          { label: 'Today', href: ROUTES.TODAY },
          { label: 'Map', href: ROUTES.MAP },
          { label: 'Schedule', href: ROUTES.SCHEDULE },
          { label: 'Security', href: ROUTES.SECURITY }
        ]}
        activeHref={location.pathname}
        itemStyle="pill"
        hoverEffect="fill"
        indicator="dot"
        layout="stack"
        surface="solid"
        size="sm"
        bounce={0.3}
        stretch={0.5}
        collapse="auto"
        intro
      />
    </div>
  );
}

const styles = {
  navContainer: {
    width: '100%',
    padding: '10px 16px 16px 16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    flexShrink: '0',
    boxSizing: 'border-box',
  },
};