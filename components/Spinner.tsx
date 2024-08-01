'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};
const Spinner = ({ loading, size = 150, style, color = '#3b82f6'}: any) => {
  return (
    <ClipLoader
      color={color}
      loading={loading}
      size={size}
      cssOverride={style || override}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
