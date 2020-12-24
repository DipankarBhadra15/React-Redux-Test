import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  MenuList,
  Grow,
  Paper,
  Popper,
  ClickAwayListener
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const NavBar = ({ vendors }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const [vendorName, setVendorName] = useState('');
  const [vendorNumber, setVendorNumber] = useState('');

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setVendorName('');
    setVendorNumber('');
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const onClick = vendor => {
    setVendorName(vendor.name);
    setVendorNumber(vendor.boothnumber);
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            ref={anchorRef}
            onClick={handleToggle}
          >
            <MenuIcon />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom'
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id='menu-list-grow'
                      onKeyDown={handleListKeyDown}
                    >
                      {vendors.map(vendor => (
                        <MenuItem
                          key={vendor.index}
                          onClick={e => onClick(vendor)}
                        >
                          {vendor.name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
      <Fragment>
        {vendorName && vendorNumber && (
          <div>
            <h1 style={{ textAlign: 'center' }}>Vendor's Name: {vendorName}</h1>
            <h1 style={{ textAlign: 'center' }}>
              Vendor's Stall Number: {vendorNumber}
            </h1>
          </div>
        )}
      </Fragment>
    </div>
  );
};

NavBar.propTypes = {
  vendors: PropTypes.object.isRequired
};

export default NavBar;
