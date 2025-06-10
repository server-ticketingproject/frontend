import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';


import router from './router.tsx';
const App = () => (
    <RouterProvider router={router}></RouterProvider>
);

createRoot(document.getElementById('root')!).render(<App />);
export default App;