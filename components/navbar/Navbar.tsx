import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { HiUserGroup } from "react-icons/hi";
import { AiFillSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import logo from "../../assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useUserState } from "../../state/user.state";
import userService from "../../services/user.service";
import { PATH_TO_USER_IMAGE } from "../../utils/constants";
import navScss from './nav.module.scss';

export default function Navbar() {
  const [dropDown, setDropDown] = useState(false);
  const userStore = useUserState();
  const isUser = userStore.user.id;

  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (e: any) => {
      if (!dropDownRef.current || dropDownRef.current.contains(e.target)) {
        return;
      }
      setDropDown(false)
    }

    window.addEventListener('mousedown', listener)

    return () => {
      window.removeEventListener("mousedown", listener);
    }
  }, [dropDownRef, setDropDown])

  async function onLogOut() {
    const { error } = await userService.signOut();

    if (error) {
      console.log("I do not know what is happening");
      return;
    }

    userStore.removeUser();
    window.location.href = "/";
  }

  function onToggleDropdown() {
    setDropDown(true)
  }

  return (
    <header className={navScss.navHeader}>
      <Link href="/" className={navScss.navLogo}>
        <a className={navScss.navLogo}>
          <Image src={logo} alt="logo" width={40} height={40}/>
          <p>TWITTER</p>
        </a>
      </Link>
      <nav>
        <ul className={navScss.navList}>
          <li><Link href="/">
            <a>Home</a>
          </Link></li>
          <li><Link href="/">
            <a>Explore</a>
          </Link></li>
        </ul>
      </nav>
      {
        isUser ?
          <div ref={dropDownRef} className={navScss.navProfile}>
            <button onClick={onToggleDropdown}>
              {
                userStore.user.image ?
                  <img
                    loading='lazy'
                    alt="profile image"
                    src={`${PATH_TO_USER_IMAGE}/${userStore.user.image}`}
                  />
                :
                  <div className={navScss.defaultImg}>
                    <p>{userStore.user.name?.slice(0, 1).toLocaleUpperCase()}</p>
                  </div>
              }
              <span>{userStore.user.name}</span>
              <IoMdArrowDropdown />
            </button>
            {
              dropDown ?
                <ul className={navScss.navDropDown}>
                  <li>
                    <Link href={"/my-profile"}>
                      <a>
                        <CgProfile />
                        <span>My Profile</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/friends"}>
                      <a><HiUserGroup />
                        <span>Friends</span></a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/settings"}>
                      <a>
                        <AiFillSetting />
                        <span>Settings</span>
                      </a>
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <button type="button" onClick={onLogOut}>
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              : null
            }
          </div>
          :
          <div className={navScss.navAuth}>
            <Link href="/login-sign-up"><a>Login / Sign up</a></Link>
          </div>
      }
    </header>
  );
}