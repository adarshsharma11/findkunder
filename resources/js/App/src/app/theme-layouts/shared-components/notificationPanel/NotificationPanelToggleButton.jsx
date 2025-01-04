import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import reducer from './store';
import { selectNotifications } from './store/dataSlice';
import { toggleNotificationPanel } from './store/stateSlice';

function NotificationPanelToggleButton({children = <FuseSvgIcon>heroicons-outline:bell</FuseSvgIcon>}) {
  const notifications = useSelector(selectNotifications);

  const dispatch = useDispatch();

  return (
    <IconButton
      className="w-40 h-40"
      onClick={(ev) => dispatch(toggleNotificationPanel())}
      size="large"
    >
      <Badge color="secondary" variant="dot" invisible={notifications.length === 0}>
        {children}
      </Badge>
    </IconButton>
  );
}

export default withReducer('notificationPanel', reducer)(NotificationPanelToggleButton);
