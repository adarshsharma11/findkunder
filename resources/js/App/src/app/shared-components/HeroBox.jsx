import React from 'react';
import Box from '@mui/material/Box';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';

function HeroBox(props) {
  const { count, descriptionText, welcomeHeading, isInquiryPage } = props;

  return (
    <Box
      className="relative md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
      sx={{ backgroundColor: 'primary.main' }}
    >
      <svg
        className="absolute inset-0 pointer-events-none"
        viewBox="0 0 960 540"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Box
          component="g"
          sx={{ color: 'primary.light' }}
          className="opacity-20"
          fill="none"
          stroke="currentColor"
          strokeWidth="100"
        >
          <circle r="234" cx="196" cy="23" />
          <circle r="234" cx="790" cy="491" />
        </Box>
      </svg>
      <Box
        component="svg"
        className="absolute -top-64 -right-64 opacity-20"
        sx={{ color: 'primary.light' }}
        viewBox="0 0 220 192"
        width="220px"
        height="192px"
        fill="none"
      >
        <defs>
          <pattern
            id="837c3e70-6c3a-44e6-8854-cc48c737b659"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor" />
          </pattern>
        </defs>
        <rect
          width="220"
          height="192"
          fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
        />
      </Box>

      <div className="z-10 relative w-full max-w-2xl">
        <div className="text-7xl font-bold leading-none text-gray-100">
          <div>Welcome to</div>
          <div>{welcomeHeading || 'our community'}</div>
        </div>
        <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
          {descriptionText ? (
            descriptionText
          ) : (
            <>Join {count !== null ? count : ' '} companies who are using our marketing network to attract relevant leads more affordably.</>
          )}
        </div>
        {!isInquiryPage &&
          <div className="flex items-center mt-32">
          <AvatarGroup
            sx={{
              '& .MuiAvatar-root': {
                borderColor: 'primary.main',
              },
            }}
          >
            <Avatar src="assets/images/avatars/female-18.jpg" />
            <Avatar src="assets/images/avatars/female-11.jpg" />
            <Avatar src="assets/images/avatars/male-09.jpg" />
            <Avatar src="assets/images/avatars/male-16.jpg" />
          </AvatarGroup>

          <div className="ml-16 font-medium tracking-tight text-gray-400">
            Attracting leads smarter, together.
          </div>
        </div>
        }
      </div>
    </Box>
  );
}

export default HeroBox;
