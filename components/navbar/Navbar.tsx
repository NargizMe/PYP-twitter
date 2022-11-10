"use client";
import styled from '@emotion/styled';
import { IoMdArrowDropdown } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { HiUserGroup } from 'react-icons/hi';
import { AiFillSetting } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import img from '../../assets/images/me.jpg';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar(){
    return(
        <Nav>
            <p>Twitter</p>
            <NavList>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/'>Explore</Link></li>
                <li><Link href='/login-sign-up'>Login / Sign up</Link></li>
            </NavList>
            <ProfileContainer>
                <button>
                    <div>
                        <Image alt = 'profile image' src={img}/>
                    </div>
                    <span>Me Mee</span>
                    <IoMdArrowDropdown />
                </button>
                <DropDown>
                    <li>
                        <CgProfile/>
                        <span>My Profile</span>
                    </li>
                    <li>
                        <HiUserGroup/>
                        <span>Group chat</span>
                    </li>
                    <li>
                        <AiFillSetting/>
                        <span>Settings</span>
                    </li>
                    <hr/>
                    <li>
                        <FiLogOut/>
                        <span>Logout</span>
                    </li>
                </DropDown>
            </ProfileContainer>
        </Nav>
    )
}



// -----------------style-----------------
const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  
  p{
    font-weight: 600;
    font-size: 19px;
    line-height: 27px;
    letter-spacing: -0.035em;
    color: var(--main-black-color);
  }
`

const NavList = styled.ul`
  padding: 0;
  display: flex;
  justify-content: space-between;
  list-style: none;
  height: 70px;
  width: 300px;

  li{
    cursor: pointer;
    line-height: 21px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid transparent;

    a{
      color: var(--dark-gray-color);
      text-decoration: none;
    }

    :hover{
      a{
        color: var(--main-blue-color);
      }
      border-bottom: 2px solid var(--main-blue-color);
    }
  }
`

const ProfileContainer = styled.div`
  position: relative;

  button{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 130px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--main-black-color);

    svg{
      font-size: 18px;
    }
  }
  
  div{
    width: 32px;
    height: 32px;
    border-radius: 3px;
    
    img{
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
`

const DropDown = styled.ul`
  display: none;
  width: 155px;
  flex-direction: column;
  justify-content: space-between;
  gap: 13px;
  list-style: none;
  padding: 15px 13px;
  background-color: white;
  
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  position: absolute;
  right: 1px;
  top: 76px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  
  li{
    display: flex;
    align-items: center;
    padding: 11px 13px;
    line-height: 16px;
    letter-spacing: -0.035em;
    color: var(--gray-second-color);
    border-radius: 13px;
    cursor: pointer;
    
    svg{
      margin-right: 13px;
      font-size: 20px;
    }
    
    :hover{
      background-color: var(--backgrounf-gray-color);
    }
    
    :last-child{
      color: var(--red-color);
    }
  }
`