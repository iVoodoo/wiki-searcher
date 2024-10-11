import clsx from 'clsx'
import { FC, InputHTMLAttributes, KeyboardEvent, memo, useId } from 'react'

import SearchIcon from '@assets/search.svg?react'
import { Button } from '@components/Button'

import style from './SearchBar.module.scss'

type SearchBar = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  label: string
  value: string
  onChange: (value: string) => void
  onSearch: (value: string) => void
}

export const SearchBar: FC<SearchBar> = memo(({ label, value, onChange, onSearch, ...rest }) => {
  const id = useId()

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(value)
    }
  }

  return (
    <div className={style.input}>
      <label htmlFor={id} className={clsx('visually-hidden', style.input__label)}>
        {label}
      </label>
      <input
        id={id}
        type='text'
        {...rest}
        className={style.input__field}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        type='button'
        onClick={() => onSearch(value)}
        className={style.input__button}
        icon={<SearchIcon className={style.input__icon} />}
      />
    </div>
  )
})
