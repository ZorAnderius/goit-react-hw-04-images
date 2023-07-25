import loadBtnCSS from './Button.module.css';

export const Button = ({ changePage }) => {
  return (
    <>
      <button className={loadBtnCSS.btn} type="button" onClick={changePage}>
        Load more
      </button>
    </>
  );
};
