import { useState } from 'react';

function useInputState(initial = '') {
  const [value, setValue] = useState(initial);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const resetValue = () => {
    setValue('');
  };

  return [value, handleInputChange, resetValue];
}

export default useInputState;
