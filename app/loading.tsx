'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};
const LoadingPage = ({ loading }: any) => {
  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      size={150}
      cssOverride={override}
      aria-label="Loading Spinner"
    />
  );
};

export default LoadingPage;
