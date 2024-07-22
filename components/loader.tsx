'use client';
import BeatLoader from 'react-spinners/BeatLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

interface LoadingPageProps{
    loading:boolean;
}
export const Loader = ({ loading }:LoadingPageProps) => {
  return (
  <div className="flex items-center justify-center h-screen">
       <BeatLoader
      color='#E0218A'
      loading={loading}
      cssOverride={override}
      size={50}
      aria-label='Loading Spinner'
    />
  </div>
  );
};
