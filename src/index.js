import { createRoot } from 'react-dom/client';
import App from './App';
import {WebSocketProvider} from "./context/WebSocketContext";
import {AuthProvider} from "./context/UserContext";
import {BrowserRouter as Router} from "react-router-dom";
import './i18n';
import { Provider } from 'react-redux';
import store from './redux/store';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <AuthProvider>
        <Provider store={store}>
            <WebSocketProvider>
                <Router>
                    <App />
                </Router>
            </WebSocketProvider>
        </Provider>
    </AuthProvider>
);