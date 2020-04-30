import React from 'react';
import { NavLink } from 'react-router-dom';

class Dashboard extends React.Component {
  render() {
    return (
      <>
        <div className='d-flex mt-5'>
          <NavLink
            to='/product'
            style={{ textDecoration: 'none', width: '50%' }}
          >
            <button
              className='btn btn-warning btn-lg '
              style={{ fontSize: '50px', width: '100%' }}
            >
              <ion-icon name='archive-outline' />
              <br />
              Product
            </button>
          </NavLink>
          <NavLink
            to='/invoice'
            style={{ textDecoration: 'none', width: '50%' }}
          >
            <button
              className='btn btn-success btn-lg '
              style={{ fontSize: '50px', width: '100%' }}
            >
              <ion-icon name='documents-outline' />
              <br />
              Invoices
            </button>
          </NavLink>
        </div>
        <div>
        <NavLink
            to='/report'
            style={{ textDecoration: 'none', width: '100%' }}
          >
            <button
              className='btn btn-primary btn-lg '
              style={{ fontSize: '50px', width: '100%' }}
            >
              <ion-icon name="cash-outline" />
              <br />
              Report
            </button>
          </NavLink>
        </div>
      </>
    );
  }
}

export default Dashboard;
