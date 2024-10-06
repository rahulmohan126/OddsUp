import { useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import {
  IconHome,
  IconLogout,
} from '@tabler/icons-react';
import classes from './NavbarSimple.module.css';
import { PiSparkleFill } from 'react-icons/pi';
import { LightDarkToggle } from '../LightDarkToggle/LightDarkToggle';
import { Link } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import { IoCreate } from "react-icons/io5";
import { useGroupModalContext } from '../GroupChatModals/GroupModalContext';

import logout from '../../helpers/logout';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { useNavigate } from 'react-router-dom';

const data = [
  { link: '/home', label: 'Home', icon: IconHome },
];

export function NavbarSimple() {
  const [active, setActive] = useState('Home');
  const { openCreateGroupModal, openJoinGroupModal } = useGroupModalContext();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const links = data.map((item) => (
    <Link
      className={`${classes.link} mb-1`}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Box visibleFrom='sm'>
      <nav className={`${classes.navbar} h-lvh`}>
        <div className={`${classes.navbarMain}`}>
          <h1 className=" text-xl font-light mb-2 flex">oddsup<sup className='pt-2'><PiSparkleFill /></sup></h1>
          {links}
          <a
            className={`${classes.link} cursor-pointer`}
            onClick={openCreateGroupModal}
          >
            <IoCreate className={classes.linkIcon} />
            Create Group
          </a>
          <a
            className={`${classes.link} cursor-pointer`}
            onClick={openJoinGroupModal}
          >
            <IoMdAdd className={classes.linkIcon} />
            Join Group
          </a>
          <a
            className={`${classes.link} cursor-pointer`}
          >
            <LightDarkToggle />
            <span className='ml-2'>{"Appearance"}</span>
          </a>

        </div>

        <div className={classes.footer} onClick={logout}>
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </nav>
    </Box>
  );
}