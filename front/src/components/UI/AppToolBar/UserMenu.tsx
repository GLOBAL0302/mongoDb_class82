import { IUser } from '../../../types';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks.ts';
import { logOutThunk } from '../../../features/Users/usersThunk.ts';
import { unsetUser } from '../../../features/Users/usersSlice.ts';
import { Button, Menu, MenuItem } from '@mui/material';

export interface Props{
  user:IUser
}

const UserMenu:React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handleClick = (event:React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = ()=>{
    setAnchorEl(null);
  }

  const handleLogOut = ()=>{
     dispatch(logOutThunk());
     dispatch(unsetUser());
  }

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        Welcome {user.username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        keepMounted
        open={Boolean(anchorEl)}
      >
        <MenuItem >
          Profile
        </MenuItem>
        <MenuItem >
          My Account
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          Log Out
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;