"use client";
import { Form } from "@/components/Form";
import { PeopleTable } from "@/components/PeopleTable";
import { useState } from "react";

export default function Home() {
  const [formVisible, setFormVisible] = useState(true);

  return (
    <>
      {formVisible && <Form onSubmit={() => setFormVisible(false)} />}
      {!formVisible && <PeopleTable onReturn={() => setFormVisible(true)} />}
    </>
  );
}
