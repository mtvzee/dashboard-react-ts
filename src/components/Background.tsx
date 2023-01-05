import { ReactNode, useEffect, useState } from 'react';
import { BackgroundImg } from '../types/background';

type Props = {
  children: ReactNode;
};

const Background = ({ children }: Props) => {
  const [image, setImage] = useState<BackgroundImg>();

  useEffect(() => {
    const getBackgroundImage = async () => {
      try {
        const res = await fetch(
          `https://api.unsplash.com/photos/random?query=landscape&client_id=${
            import.meta.env.VITE_UNSPLASH_ACCESS_KEY
          }`
        );
        const data = await res.json();
        setImage(data);
      } catch (error) {
        console.error(error);
      }
    };
    getBackgroundImage();
  }, []);

  return (
    <div
      className="h-screen bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${image?.urls.full})` }}
    >
      {children}
    </div>
  );
};

export default Background;
