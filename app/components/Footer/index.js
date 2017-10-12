import React from 'react';
import FooterLink from './FooterLink';
const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
};

function Footer() {
  return (
    <div style={styles.layout}>
      <FooterLink to="/home">home</FooterLink>
      <FooterLink to="/dashboard">dashboard</FooterLink>
      <FooterLink to="/contacts">contacts</FooterLink>
      <FooterLink to="/users">users</FooterLink>
    </div>
  );
}

export default Footer;
