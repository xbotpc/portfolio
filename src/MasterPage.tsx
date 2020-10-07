import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CONSTANTS from './utils/constants.json';
import styles from './stylesheets/masterpage/masterpage.module.scss';

// IMPORTING PAGES FOR ROUTING
import Dashboard from './pages/dashboard';
const Todo = lazy(() => import('./pages/todo'));
const Calculator = lazy(() => import('./pages/calculator'));


function MasterPage() {
    const showNavigation = [CONSTANTS.PATHS.DEFAULT, CONSTANTS.PATHS.RESET, CONSTANTS.PATHS.SIGNUP, CONSTANTS.PATHS.LOGIN].includes(window.location.pathname);
    return (
        <>
            <div className={styles.windowContainer}>
                <div
                    className={styles.windowInnerContainer}
                    style={{
                        backgroundColor: '#F0F0F7',
                        overflowY: 'scroll',
                    }}
                >
                    <Router>
                        <Suspense fallback={<>{'Loading'}</>}>
                            <Switch>
                                <Route exact path={CONSTANTS.PATHS.DASHBOARD} component={Dashboard} />
                                <Route exact path={CONSTANTS.PATHS.DEFAULT} component={Todo} />
                                <Route exact path={CONSTANTS.PATHS.TODO} component={Todo} />
                                <Route exact path={CONSTANTS.PATHS.CALCULATOR} component={Calculator} />
                            </Switch>
                        </Suspense>
                    </Router>
                </div>
            </div>
        </>
    );
}

export default MasterPage;
