import { useEffect, useState } from 'react';
import { getShared, watchEntries } from '../firebase/social';

// Loads kind/{id} once. status: 'loading' | 'ready' | 'missing' | 'error'
export const useSharedDoc = (kind, id) => {
  const [state, setState] = useState({ status: 'loading', doc: null });
  useEffect(() => {
    let active = true;
    setState({ status: 'loading', doc: null });
    getShared(kind, id)
      .then((doc) => active && setState({ status: doc ? 'ready' : 'missing', doc }))
      .catch((error) => {
        console.error(error);
        if (active) setState({ status: 'error', doc: null });
      });
    return () => {
      active = false;
    };
  }, [kind, id]);
  return state;
};

// Live entries of kind/{id}/{sub}; null until the first snapshot arrives.
export const useEntries = (kind, id, sub, enabled = true) => {
  const [entries, setEntries] = useState(null);
  useEffect(() => {
    if (!enabled) return undefined;
    return watchEntries(kind, id, sub, setEntries, (error) => {
      console.error(error);
      setEntries([]);
    });
  }, [kind, id, sub, enabled]);
  return entries;
};
