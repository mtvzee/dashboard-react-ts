import dayjs from 'dayjs';
import { ReactNode, useEffect, useState } from 'react';
import { BackgroundImg } from '../types/background';

type Props = {
  children: ReactNode;
};

const Background = ({ children }: Props) => {
  const [image, setImage] = useState<BackgroundImg>();
  const savedPhoto = JSON.parse(
    localStorage.getItem('backgroundImage') ?? '{}'
  );

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
        localStorage.setItem(
          'backgroundImage',
          JSON.stringify({
            accessTime: dayjs().format('YYYY-MM-DD'),
            photoURL: data.urls.full,
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    if (dayjs().format('YYYY-MM-DD') !== savedPhoto.accessTime) {
      getBackgroundImage();
    }
  }, []);

  return (
    <div
      className="relative h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${savedPhoto.photoURL ?? image?.urls.full})`,
        // 'url(https://source.unsplash.com/random)',
      }}
    >
      {children}
    </div>
  );
};

export default Background;
