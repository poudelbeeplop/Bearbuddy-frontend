import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';

export default function MapPage() {
  return (
    <section className="page">
      <h1>Map</h1>
      <Link to={ROUTES.ROUTE} className="btn btn-primary">Preview route</Link>
    </section>
  );
}
