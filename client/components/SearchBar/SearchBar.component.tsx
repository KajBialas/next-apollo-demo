import React, { useState } from 'react';
import { LANG } from '../../lang/LANG';
import { StyledInput } from './SearchBar.style'

interface SearchProps {
  onChange: (inputValue: string) => void
  currentValue: string,
}

const SearchBarComponent = ({ onChange, currentValue }: SearchProps): JSX.Element => {
  const [inputValue, setInputValue] = useState(currentValue);

  const onHandleChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);

    if (currentValue.length >= 3 || value.length >= 3) {
      onChange(value);
    } else {
      onChange('');
    }

    return;
  }

  return (
    <div>
      <StyledInput
        name='searchBar'
        type='text'
        onChange={onHandleChange}
        data-testid='searchBar'
        placeholder={LANG.EN.searchLabel}
        value={inputValue}
      />
    </div>
  )
}

export default SearchBarComponent;