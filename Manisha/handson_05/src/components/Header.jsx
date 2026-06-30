function Header({ siteName, enrolledCount }) {
  return (
    <header style={styles.header}>
      <span style={styles.siteName}>{siteName}</span>
      <nav>
        <ul style={styles.navList}>
          <li><a href="#" style={styles.navLink}>Home</a></li>
          <li><a href="#" style={styles.navLink}>Courses</a></li>
          <li><a href="#" style={styles.navLink}>Profile</a></li>
          <li style={styles.enrolledBadge}>Enrolled: {enrolledCount}</li>
        </ul>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#1a73e8',
    color: 'white',
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  siteName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  enrolledBadge: {
    backgroundColor: 'white',
    color: '#1a73e8',
    padding: '4px 12px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  }
};

export default Header;