import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const contain = document.getElementById('root');
const app = createRoot(contain);

app.render( <App/>)