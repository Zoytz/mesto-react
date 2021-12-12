import headerLogo from '../images/Logo.svg';

function Header() {
  return (
    <header className="header page__header">
      <img className="logo" src={headerLogo} alt="Место" />
    </header>
  );
}

export default Header;