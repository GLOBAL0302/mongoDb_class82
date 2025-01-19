import { IUser } from '../../../types';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks.ts';
import { logOutThunk } from '../../../features/Users/usersThunk.ts';
import { unsetUser } from '../../../features/Users/usersSlice.ts';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(logOutThunk());
    dispatch(unsetUser());
    navigate('/');
  };

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        <Typography mr={2} variant="body2" component="p" color="inherit">
          Welcome
        </Typography>
        <strong style={{ textDecoration: 'underline' }}>{user.username}</strong>
      </Button>
      <Menu anchorEl={anchorEl} onClose={handleClose} keepMounted open={Boolean(anchorEl)}>
        <MenuItem onClick={() => navigate('/trackHistory')}>My Play History</MenuItem>
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
