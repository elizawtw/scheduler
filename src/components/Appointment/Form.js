import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //reset function
  const reset = function() {
    setName("");
    setInterviewer(null);
    setError('');
  };

  //cancel function
  const cancel = function() {
    reset();
    props.onCancel();
  };

  const handleInput = function(event) {
    const textInput = event.target.value;
    setName(textInput);
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError('');
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={handleInput}
            value={name}
            data-testid="student-name-input"
       
      />
        
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}