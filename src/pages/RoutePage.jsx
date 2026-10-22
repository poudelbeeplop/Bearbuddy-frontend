import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';

export default function RoutePage() {
  return (
    <section className="page">
      <h1>Route</h1>
      <Link to={ROUTES.MAP} className="btn">Back to map</Link>
    </section>
  );
}
