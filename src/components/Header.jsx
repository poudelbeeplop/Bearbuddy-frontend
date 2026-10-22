import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';

export default function Header({ session, onSignIn, onSignOut }) {
  return (
    <header className="header">
      <Link to={ROUTES.TODAY} className="header-brand">BearBuddy</Link>
      <div className="header-actions">
        {session?.guest ? (
          <button className="btn btn-small btn-primary" onClick={onSignIn}>Sign in</button>
        ) : (
          <button className="btn btn-small" onClick={onSignOut}>Sign out</button>
        )}
      </div>
    </header>
  );
}
