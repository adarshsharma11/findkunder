import FuseLoading from '@fuse/core/FuseLoading';
import PropTypes from 'prop-types';
import { Suspense } from 'react';

/**
 * React Suspense defaults
 * For to Avoid Repetition
 */ function FuseSuspense({children, loadingProps = { delay: 0 }}) {
  return <Suspense fallback={<FuseLoading {...loadingProps} />}>{children}</Suspense>;
}

FuseSuspense.propTypes = {
  loadingProps: PropTypes.object,
};

export default FuseSuspense;
