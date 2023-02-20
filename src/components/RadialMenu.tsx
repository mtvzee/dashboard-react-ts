import googleIcon from '../assets/google-icon.svg';
import gmail from '../assets/google-gmail.svg';
import googleCalendar from '../assets/google-calendar.svg';
import { AiOutlinePlus } from 'react-icons/ai';
import { useContext } from 'react';
import { ShowModalContext } from '../context/ShowModalContext';

export const RadialMenu = () => {
  const { showModal, setShowModal } = useContext(ShowModalContext);

  const handleToggleRadialMenu = () => {
    setShowModal({
      weather: showModal.weather,
      todo: showModal.todo,
      radialMenu: !showModal.radialMenu,
    });
  };

  return (
    <div className="absolute bottom-4 left-4 w-[140px] h-[140px]">
      <button
        className={`absolute bottom-0 left-0 w-[50px] h-[50px] flex justify-center items-center bg-black/20 backdrop-blur-xl rounded-full transition duration-500 ${
          showModal.radialMenu && 'rotate-[135deg]'
        }`}
        onClick={handleToggleRadialMenu}
      >
        <AiOutlinePlus className="w-8 h-8" />
      </button>
      <ul>
        <li className={`radialMenuList ${showModal.radialMenu && 'show'}`}>
          <a
            href="https://www.google.co.jp/webhp?authuser=0"
            className="radialMenuAnchor"
          >
            <img src={googleIcon} alt="google icon" className="w-8 h-8" />
          </a>
        </li>
        <li className={`radialMenuList ${showModal.radialMenu && 'show'}`}>
          <a
            href="https://mail.google.com/mail/?authuser=0&ogbl"
            className="radialMenuAnchor"
          >
            <img src={gmail} alt="gmail" className="w-8 h-8 -rotate-[45deg]" />
          </a>
        </li>
        <li className={`radialMenuList ${showModal.radialMenu && 'show'}`}>
          <a
            href="https://calendar.google.com/calendar?authuser=0"
            className="radialMenuAnchor"
          >
            <img
              src={googleCalendar}
              alt="google calendar"
              className="w-8 h-8 -rotate-[90deg]"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};
