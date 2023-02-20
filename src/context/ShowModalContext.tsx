import { createContext, ReactNode, useEffect, useState } from 'react';

type ShowModal = {
  weather: boolean;
  todo: boolean;
  radialMenu: boolean;
};

type Props = {
  children: ReactNode;
};

export const ShowModalContext = createContext(
  {} as {
    showModal: ShowModal;
    setShowModal: React.Dispatch<React.SetStateAction<ShowModal>>;
  }
);

export const ShowModalContextProvider = ({ children }: Props) => {
  const [showModal, setShowModal] = useState<ShowModal>(
    JSON.parse(
      localStorage.getItem('showModal') ??
        '{"weather":false,"todo":false,"radialMenu":false}'
    )
  );

  // ローカルストレージにモーダルの開閉状態オブジェクトを文字列に変換して保存
  useEffect(() => {
    localStorage.setItem('showModal', JSON.stringify(showModal));
  }, [showModal]);

  const value = { showModal, setShowModal };

  return (
    <ShowModalContext.Provider value={value}>
      {children}
    </ShowModalContext.Provider>
  );
};
