import React from 'react';
import "components/Appointment/styles.scss";
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';

export default function Appointment(props) {
 
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRMING";
  const EDITING = "EDITING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    
    props.bookInterview(props.id, interview)
    .then (() => {
      transition(SHOW);
    })
    
  }
  //delete appointment
  function deleting() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
  }

  function confirmation() {
    transition(CONFIRMING);
  }

  function edit() {
    transition(EDITING);
  }
 
  return (
    
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => edit()}
          onDelete={() => confirmation()}

        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}

      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRMING && (
        <Confirm
          onConfirm={() => deleting()}
          onCancel={back}
          message="Proceed to delete?"
          />
      )}
      {mode === EDITING && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
          />
      )}

      
    </article>
  )
}