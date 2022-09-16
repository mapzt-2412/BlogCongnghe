import dynamic from 'next/dynamic';

const MapBox = dynamic(() => import('./Map'), {
  ssr: false
});

export default(MapBox)