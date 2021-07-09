import { useState } from 'react';


export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    console.log(mode)
    const [history, setHistory] = useState([initial]);
    const transition = function(newMode, replace = false) {
      if (replace) {
        setMode(newMode);
      } else {
        setMode(newMode);
        setHistory([...history, newMode]);

      }

    }
    function back() { 
      if (history.length === 1) {
        setMode(initial);
      } else {
          setMode(history[history.length-2]);
        setHistory(history.slice(0,-1));
      }
      
    }

    return { mode, transition, back };
}
