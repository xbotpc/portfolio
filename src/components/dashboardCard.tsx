import React from 'react';
import styles from '../stylesheets/dashboard/dashboardCard.module.scss';

interface DashboardCardProps {
    value: string | number;
    cardContent: string;
    variance: string | number;
    headerImage?: string;
}

const DashboardCard = (props: DashboardCardProps) => {
    const {
        value, variance,
        headerImage, cardContent,
    } = props;
    return (
        <>
            <div className={styles.cardContainer}>
                <img
                    className={styles.headerImage}
                    alt="Header"
                    src={headerImage}
                />
                <div className={styles.value}>
                    {value}
                </div>
                <div className={styles.cardContent}>
                    {cardContent}
                </div>
                <div className={styles.variance}>
                    {variance}
                </div>
            </div>
        </>
    );
};

export default DashboardCard;
