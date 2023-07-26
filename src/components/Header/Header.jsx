import headerCSS from './Header.module.css';

export const Header = ({ children }) => {
  return <div className={headerCSS['header_fixed']}>{children}</div>;
};
