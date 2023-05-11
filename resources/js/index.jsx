import { createRoot } from 'react-dom/client';
import Tab from './components/Tab';
import '../css/style.css'

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <>
    <Tab />
  </>
);
