;
import Image from "next/image";
import img from "../../assets/images/signin-image.jpeg";
import { useState } from "react";
import Login from "../../components/login-signup/Login";
import SignUp from "../../components/login-signup/SignUp";
import authScss from '../../styles/auth.module.scss';

export default function LoginSignUp() {
  const [tab, setTab] = useState(true);

  return (
    <main className={authScss.authMain}>
      <section className={authScss.authContainer}>
        <div>
          <Image alt="signup-image image" src={img} width={50} height={50} />
        </div>
        <div>
          <div className={authScss.authButtonContainer}>
            <button
              onClick={() => setTab(true)}
              className={tab? authScss.authActiveButton: authScss.authPassiveButton}
            >Login
            </button>
            <button
              onClick={() => setTab(false)}
              className={!tab? authScss.authActiveButton: authScss.authPassiveButton}
            >Sign up
            </button>
          </div>
          {
            tab ? <Login /> : <SignUp />
          }
        </div>
      </section>
    </main>
  );
}