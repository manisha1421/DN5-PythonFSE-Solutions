function Footer() {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2025 Student Portal. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#1a73e8',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    fontSize: '0.9rem',
    marginTop: '40px',
  }
};

export default Footer;