import { useState } from 'react';
import * as s from './ContactForm.styled';

export const ContactForm = ({ handleAddProfile }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleFormSumbit = e => {
    e.preventDefault();

    const formData = { name, number: Number(number) };
    handleAddProfile(formData);

    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleChange = e => {
    const { value } = e.target;

    setName(value);
  };

  return (
    <s.Form onSubmit={handleFormSumbit}>
      <s.Label>
        <span>Name:</span>
        <s.Input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </s.Label>
      <s.Label>
        <span>Number:</span>
        <input
          type="tel"
          name="number"
          value={number}
          onChange={e => setNumber(e.target.value)}
          required
        />
      </s.Label>
      <s.Button type="submit">Add contact</s.Button>
    </s.Form>
  );
};
