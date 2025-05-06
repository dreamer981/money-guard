import css from "./Header.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors"; //Redux Selectors dosyasına eklenmeli
import { NavLink } from "react-router-dom";
import Icon from "../../assets/Icons";
import useMedia from "../../hooks/useMedia";
import LogOutModal from "../LogOutModal/LogOutModal";

import useToggle from "../../hooks/useToggle";

const Header = () => {
  const isLogged = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const [{ isOpen, closeModal, openModal }] = useToggle();
  const { isMobile } = useMedia();

  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <div className={css.logo}>
          <NavLink to="/">
            {isMobile ? (
              <Icon id="#icon-logo-mobile" className={css.iconMobile} />
            ) : (
              <Icon id="#icon-logo-tablet-desktop" className={css.iconTablet} />
            )}
          </NavLink>
          <ul>
            <li>
              {isLogged ? (
                <p className={css.text}>{user.name}</p>
              ) : (
                "Hello, Anonymous"
              )}
            </li>
            <li>
              <div className={css.wrap}>
                <button className={css.headerBtn} onClick={openModal}>
                  <Icon id="#icon-exit" className={css.iconExit} />
                  {isMobile ? null : "Exit"}
                </button>
                {isOpen && <LogOutModal closeModal={closeModal} />}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
