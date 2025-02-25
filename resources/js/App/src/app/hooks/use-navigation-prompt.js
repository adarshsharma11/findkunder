import { useState, useEffect } from "react";

export default function useNavigationPrompt({ isDirty, onSubmit, history, unblockRef }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  useEffect(() => {
    if (unblockRef.current) {
      unblockRef.current();
    }

    if (isDirty) {
      unblockRef.current = history.block((tx) => {
        setPendingNavigation(tx);
        setShowPrompt(true);
        return false;
      });
    } else {
      unblockRef.current = null;
    }

    return () => {
      if (unblockRef.current) {
        unblockRef.current();
        unblockRef.current = null;
      }
    };
  }, [isDirty]);

  const handlePromptConfirm = async () => {
    await onSubmit();
    setShowPrompt(false);

    if (pendingNavigation) {
      if (unblockRef.current) {
        unblockRef.current();
        unblockRef.current = null;
      }

      history.push(pendingNavigation.location.pathname);
      setPendingNavigation(null);
    }
  };

  const handlePromptCancel = () => {
    setShowPrompt(false);
    setPendingNavigation(null);
    if (unblockRef.current) {
      unblockRef.current();
      unblockRef.current = null;
    }

    if (pendingNavigation) {
      history.push(pendingNavigation.location.pathname);
    } else {
      history.goBack();
    }
  };

  return { showPrompt, pendingNavigation, handlePromptConfirm, handlePromptCancel };
}
