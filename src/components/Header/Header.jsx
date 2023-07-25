import headerCSS from './Header.module.css';

export const Header = ({ style, children }) => {
  return <div className={headerCSS['header_fixed']}>{children}</div>;
};
