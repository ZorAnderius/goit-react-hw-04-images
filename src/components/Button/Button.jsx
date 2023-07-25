import loadBtnCSS from './Button.module.css';

export const Button = ({ addImages }) => {
  return (
    <>
      <button className={loadBtnCSS.btn} type="button" onClick={addImages}>
        Load more
      </button>
    </>
  );
};
