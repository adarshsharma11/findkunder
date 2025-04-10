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

  // Function to unblock navigation without showing prompt
  const unblockNavigation = () => {
    if (unblockRef.current) {
      unblockRef.current();
      unblockRef.current = null;
    }
    setPendingNavigation(null);
    setShowPrompt(false);
  };

  const handlePromptConfirm = async () => {
    // Call onSubmit and get the result
    const submitResult = await onSubmit();

    // Only close the prompt and navigate away if onSubmit returns true
    // This allows the form to validate and stay on the page if needed
    if (submitResult) {
      setShowPrompt(false);

      if (pendingNavigation) {
        unblockNavigation();
      }
    } else {
      // Keep the dialog open if validation failed
      setShowPrompt(false);
    }
  };

  const togglePrompt = (show = null) => {
    if (show !== null) {
      setShowPrompt(show);
    } else {
      setShowPrompt(!showPrompt);
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

  return { 
    showPrompt, 
    pendingNavigation, 
    handlePromptConfirm, 
    handlePromptCancel, 
    togglePrompt,
    unblockNavigation 
  };
}
