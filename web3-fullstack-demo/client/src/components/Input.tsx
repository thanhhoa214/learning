import { ChangeEvent } from 'react';

export interface InputProps {
  placeholder: string;
  name: string;
  type: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>, name: string) => void;
  value?: string;
}

export default function Input({ placeholder, name, type, value, handleChange }: InputProps) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={e => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
}
