import { amber } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { memo, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '../FuseSvgIcon';

function FuseShortcuts({variant= 'horizontal', shortcuts, onChange, className, ...props }) {

  const searchInputRef = useRef(null);
  const { navigation } = props;
  const [addMenu, setAddMenu] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const shortcutItems = shortcuts
    ? shortcuts.map((id) => navigation.find((item) => item.id === id))
    : [];

  function addMenuClick(event) {
    setAddMenu(event.currentTarget);
  }

  function addMenuClose() {
    setAddMenu(null);
  }

  function search(ev) {
    const newSearchText = ev.target.value;

    setSearchText(newSearchText);

    if (newSearchText.length !== 0 && navigation) {
      setSearchResults(
        navigation.filter((item) => item.title.toLowerCase().includes(newSearchText.toLowerCase()))
      );
      return;
    }
    setSearchResults(null);
  }

  function toggleInShortcuts(id) {
    let newShortcuts = [...shortcuts];
    newShortcuts = newShortcuts.includes(id)
      ? newShortcuts.filter((_id) => id !== _id)
      : [...newShortcuts, id];
    onChange(newShortcuts);
  }

  function ShortcutMenuItem({ item, onToggle }) {
    if (!item || !item.id) {
      return null;
    }

    return (
      <Link to={item.url || ''} role="button">
        <MenuItem key={item.id}>
          <ListItemIcon className="min-w-40">
            {item.icon ? (
              <FuseSvgIcon>{item.icon}</FuseSvgIcon>
            ) : (
              <span className="text-20 font-semibold uppercase text-center">{item.title[0]}</span>
            )}
          </ListItemIcon>
          <ListItemText primary={item.title} />
          <IconButton
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              onToggle(item.id);
            }}
            size="large"
          >
            <FuseSvgIcon color="action">
              {shortcuts.includes(item.id) ? 'heroicons-solid:star' : 'heroicons-outline:star'}
            </FuseSvgIcon>
          </IconButton>
        </MenuItem>
      </Link>
    );
  }

  return (
    <div
      className={clsx(
        'flex flex-1',
        variant === 'vertical' && 'flex-col grow-0 shrink',
        className
      )}
    >
      {useMemo(() => {
        const container = {
          show: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        };
        const item = {
          hidden: { opacity: 0, scale: 0.6 },
          show: { opacity: 1, scale: 1 },
        };
        return (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={clsx('flex flex-1', variant === 'vertical' && 'flex-col')}
          >
            {shortcutItems.map(
              (_item) =>
                _item && (
                  <Link to={_item.url} key={_item.id} role="button">
                    <Tooltip
                      title={_item.title}
                      placement={variant === 'horizontal' ? 'bottom' : 'left'}
                    >
                      <IconButton
                        className="w-40 h-40 p-0"
                        component={motion.div}
                        variants={item}
                        size="large"
                      >
                        {_item.icon ? (
                          <FuseSvgIcon>{_item.icon}</FuseSvgIcon>
                        ) : (
                          <span className="text-20 font-semibold uppercase">{_item.title[0]}</span>
                        )}
                      </IconButton>
                    </Tooltip>
                  </Link>
                )
            )}
          </motion.div>
        );
      }, [addMenu, variant, shortcutItems])}

      <Menu
        id="add-menu"
        anchorEl={addMenu}
        open={Boolean(addMenu)}
        onClose={addMenuClose}
        classes={{
          paper: 'min-w-256',
        }}
        TransitionProps={{
          onEntered: () => {
            searchInputRef.current.focus();
          },
          onExited: () => {
            setSearchText('');
          },
        }}
      >
        <div className="p-16 pt-8">
          <Input
            inputRef={searchInputRef}
            value={searchText}
            onChange={search}
            placeholder="Search for an app or page"
            className=""
            fullWidth
            inputProps={{
              'aria-label': 'Search',
            }}
            disableUnderline
          />
        </div>

        <Divider />

        {searchText.length !== 0 &&
          searchResults &&
          searchResults.map((_item) => (
            <ShortcutMenuItem
              key={_item.id}
              item={_item}
              onToggle={() => toggleInShortcuts(_item.id)}
            />
          ))}

        {searchText.length !== 0 && searchResults.length === 0 && (
          <Typography color="text.secondary" className="p-16 pb-8">
            No results..
          </Typography>
        )}

        {searchText.length === 0 &&
          shortcutItems.map(
            (_item) =>
              _item && (
                <ShortcutMenuItem
                  key={_item.id}
                  item={_item}
                  onToggle={() => toggleInShortcuts(_item.id)}
                />
              )
          )}
      </Menu>
    </div>
  );
}

FuseShortcuts.propTypes = {};

export default memo(FuseShortcuts);
