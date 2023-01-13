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
    // TODO:unsplashにプロジェクトを登録してアクセス制限の上限を上げる
    // getBackgroundImage();
  }, []);

  return (
    <div
      className="relative h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          // TODO:unsplashにプロジェクトを登録してアクセス制限の上限を上げて、URLを切り替える
          // `url(${image?.urls.full})`
          'url(https://source.unsplash.com/random)',
      }}
    >
      <div className="absolute inset-0 bg-radial" />
      {children}
    </div>
  );
};

export default Background;
