"use client";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { HiUserGroup } from "react-icons/hi";
import { AiFillSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import img from "../../assets/images/me.jpg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useUserState } from "../../state/user.state";
import userService from "../../services/user.service";
import { PATH_TO_USER_IMAGE } from "../../utils/constants";
import navScss from './nav.module.scss';
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [dropDown, setDropDown] = useState(false);
  const userStore = useUserState();
  const isUser = userStore.user.id;
  const router = useRouter();

  async function onLogOut() {
    const { error } = await userService.signOut();

    if (error) {
      console.log("I do not know what is happening");
      return;
    }

    userStore.removeUser();
    await router.refresh();
    // window.location.href = "/";
  }

  return (
    <header className={navScss.navHeader}>
      <p>Twitter</p>
      <nav>
        <ul className={navScss.navList}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/">Explore</Link></li>
        </ul>
      </nav>
      {
        isUser ?
          <div className={navScss.navProfile}>
            <button onClick={() => setDropDown(!dropDown)}>
                {
                  userStore.user.image ?
                    <img
                      loading='lazy'
                      alt="profile image"
                      src={`${PATH_TO_USER_IMAGE}/${userStore.user.image}`}
                      width={32}
                      height={32}
                    />
                    :
                    <Image
                      alt="profile image"
                      src={img}
                      width={32}
                      height={32}
                    />
                }
              <span>{userStore.user.name}</span>
              <IoMdArrowDropdown />
            </button>
            {
              dropDown ?
                <ul className={navScss.navDropDown}>
                  <li>
                    <Link href={"/profile"}>
                      <CgProfile />
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/group-chat"}>
                      <HiUserGroup />
                      <span>Group chat</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/settings"}>
                      <AiFillSetting />
                      <span>Settings</span>
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
            <Link href="/login-sign-up">Login / Sign up</Link>
          </div>
      }
    </header>
  );
}