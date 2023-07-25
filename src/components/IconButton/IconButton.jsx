import iconBtnCSS from './IconButton.module.css';

export const IconButton = ({ type, children }) => {
  return (
    <button className={iconBtnCSS['btn-submit']} type={type}>
      {children}
    </button>
  );
};
