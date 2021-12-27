import React from 'react';
import styles from './Tables.module.scss';
import { Link } from 'react-router-dom';


const Tables = () => (
  <div className={styles.component}>
    <h2>Tables</h2>
    <span>Następnie w widokach, których ścieżki zawierają :id, wyświetl ten identyfikator pod tytułem widoku.</span>
    <Link to={`${process.env.PUBLIC_URL}/tables/booking/new`} activeClassName='active'>New Booking</Link>
    <Link to={`${process.env.PUBLIC_URL}/tables/booking/:id`} activeClassName='active'>Booking ID</Link>
    <Link to={`${process.env.PUBLIC_URL}/tables/events/new`} activeClassName='active'>New Event</Link>
    <Link to={`${process.env.PUBLIC_URL}/tables/events/:id`} activeClassName='active'>Event ID</Link>
  </div>
);

export default Tables;
