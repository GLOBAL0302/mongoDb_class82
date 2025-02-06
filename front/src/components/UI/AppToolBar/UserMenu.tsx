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

  const handleLogOut = async () => {
    await dispatch(logOutThunk());
    dispatch(unsetUser());
    navigate('/');
  };

  console.log(user);


  return (
    <>
      <Button onClick={handleClick} color="inherit">
        <Typography mr={2} variant="body2" component="p" color="inherit">
          Welcome
        </Typography>
        <strong style={{ textDecoration: 'underline' }}>{user.displayName}</strong>
        {user.image && <img src={user.image} alt={user.username} />}
      </Button>
      <Menu anchorEl={anchorEl} onClose={handleClose} keepMounted open={Boolean(anchorEl)}>
        <MenuItem onClick={() => navigate('/trackHistory')}>My Play History</MenuItem>
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
