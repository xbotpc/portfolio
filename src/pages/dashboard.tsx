import React from 'react';
import DashboardCard from '../components/dashboardCard';
import styles from '../stylesheets/dashboard/dashboard.module.css';

const Dashboard = () => (
    <>
        <div className={styles.cardContainer}>
            <div className={styles.cardHeader}>
                Live Shipments
            </div>
            <div className={styles.cards}>
                <DashboardCard
                    cardContent={'Total Shipments'}
                    value={865}
                    variance='100%'
                />
            </div>
        </div>
    </>
);

Dashboard.propTypes = {

};

export default Dashboard;
