import { useState } from 'react';
import { Box } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconLogout,
} from '@tabler/icons-react';
import classes from './NavbarSimple.module.css';
import { PiSparkleFill } from 'react-icons/pi';
import { LightDarkToggle } from '../LightDarkToggle/LightDarkToggle';

const data = [
  { link: '', label: 'Notifications', icon: IconBellRinging },
  { link: '', label: 'Billing', icon: IconReceipt2 },
  { link: '', label: 'Security', icon: IconFingerprint },
  { link: '', label: 'SSH Keys', icon: IconKey },
  { link: '', label: 'Databases', icon: IconDatabaseImport },
  { link: '', label: 'Authentication', icon: Icon2fa },
  { link: '', label: 'Other Settings', icon: IconSettings },
];

export function NavbarSimple() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Box visibleFrom='sm'>
      <nav className={classes.navbar}>
        <div className={`${classes.navbarMain}`}>
          <h1 className="text-xl font-light mb-2 flex">oddsup<sup className='pt-2'><PiSparkleFill /></sup></h1>
          {links}
          <a
            className={classes.link}
          >
            <LightDarkToggle />
            <span className='ml-2'>{"Appearance"}</span>
          </a>
        </div>

        <div className={classes.footer}>
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </nav>
    </Box>
  );
}