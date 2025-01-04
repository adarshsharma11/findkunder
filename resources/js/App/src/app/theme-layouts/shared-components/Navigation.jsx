import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNavigation } from 'app/store/fuse/navigationSlice';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { navbarCloseMobile } from 'app/store/fuse/navbarSlice';

function Navigation({ className, layout = 'vertical', dense, active}) {
  const navigation = useSelector(selectNavigation);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const dispatch = useDispatch();

  return useMemo(() => {
    function handleItemClick(item) {
      if (isMobile) {
        dispatch(navbarCloseMobile());
      }
    }

    return (
      <FuseNavigation
        className={clsx('navigation', className)}
        navigation={navigation}
        layout={layout}
        dense={dense}
        active={active}
        onItemClick={handleItemClick}
      />
    );
  }, [dispatch, isMobile, navigation, active, className, dense, layout]);
}

export default memo(Navigation);
