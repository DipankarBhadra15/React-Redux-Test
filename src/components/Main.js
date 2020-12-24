import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import { vendorLists } from '../utils/VendorList';
import { getVendorsSorted } from '../reduxActions/vendorActions';

const Main = ({ vendorReducer: { vendors }, getVendorsSorted }) => {
  useEffect(() => {
    getVendorsSorted(vendorLists);
  }, [getVendorsSorted]);

  return (
    <Fragment>
      <NavBar vendors={vendors} />
    </Fragment>
  );
};

Main.propTypes = {
  vendorReducer: PropTypes.object.isRequired,
  getVendorsSorted: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vendorReducer: state.vendorReducer
});

export default connect(mapStateToProps, { getVendorsSorted })(Main);
