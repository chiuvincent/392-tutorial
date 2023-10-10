import { NavLink } from 'react-router-dom';
import 'Navigation.css';

const activation = ({isActive}) => isActive ? 'active' : 'inactive';

const Navigation = () => (
  <nav>
    <NavLink to="/" className={activation}>Posts</NavLink>
    <NavLink to="/users" className={activation}>Users</NavLink>
  </nav>
);