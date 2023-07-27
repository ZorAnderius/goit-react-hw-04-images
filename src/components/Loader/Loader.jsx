import DotLoader from 'react-spinners/DotLoader';

import LoaderCSS from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={LoaderCSS.loader_wraper}>
      <div className={LoaderCSS.container}>
        <DotLoader color="#ceddda" size={300} />
      </div>
    </div>
  );
};
