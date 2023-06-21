import { useState, useEffect } from "react";
import { nanoid } from 'nanoid'
import ContactForm from "./ContactForm";
import Contacts from "./Contacts";
import Filter from "./Filter";

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isExist = contacts.map(contact => contact.name === name).includes(true)

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return
    } else {
      setContacts(prevContacts =>
        [contact, ...prevContacts],
      )
    }
  };
    
    const deleteContact = contactId => {
      setContacts(contacts.filter(({ id }) => id !== contactId));
    }
    
    const changeFilter = e => {
      setFilter(e.currentTarget.value)
    }
    
    const getVisibleContacts = () => {
      const normalizedFilter = filter.toLowerCase();

      return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
    };

    return (<div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <Contacts contacts={getVisibleContacts()} onDeleteContact={deleteContact} />
    </div>);
  };