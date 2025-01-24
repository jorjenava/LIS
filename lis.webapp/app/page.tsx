"use client";
import { PersonModel } from "@/api_client";
import { Form } from "@/components/Form";
import { PeopleTable } from "@/components/PeopleTable";
import { Person } from "@/components/Person";
import { useState } from "react";

export default function Home() {
  const [formVisible, setFormVisible] = useState(true);
  const [person, setPerson] = useState<PersonModel>();

  const handleSubmit = (person: PersonModel) => {
    setPerson(person);
    setFormVisible(false);
  };

  return (
    <>
      {formVisible && <Form onSubmit={handleSubmit} />}
      {!formVisible && person && <Person person={person} />}
      {!formVisible && <PeopleTable excludePersonId={person?.id} onReturn={() => setFormVisible(true)} />}
    </>
  );
}
