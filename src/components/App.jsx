import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import * as s from './App.styled';
import { useEffect } from 'react';

const getContacts = () => {
  const contacts = localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(contacts);

  if (parsedContacts) {
    return JSON.parse(contacts);
  }
};

export const App = () => {
  const [contacts, setContacts] = useState(getContacts);
  const [filterValue, setFilterValue] = useState('');

  const handleAddProfile = formData => {
    const hasDuplicates = contacts.some(
      contact => contact.name === formData.name
    );

    if (hasDuplicates) {
      alert(`${formData.name} is already in contacts`);
      return;
    }

    const newProfile = { ...formData, id: nanoid() };

    setContacts(prevContacts => [...prevContacts, newProfile]);
  };


  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(el => el.id !== id));
  };

  const handleChangeFilter = e => {
    setFilterValue(e.target.value);
  };

  const searchContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  useEffect(() => {
    const prevContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    if (contacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  return (
    <s.Container>
      <h1>Phonebook</h1>
      <ContactForm handleAddProfile={handleAddProfile} />

      <h2>Contacts</h2>
      <Filter filter={filterValue} handleChangeFilter={handleChangeFilter} />
      <ContactList users={searchContact()} deleteContact={deleteContact} />
    </s.Container>
  );
};
