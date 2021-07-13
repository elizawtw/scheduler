import {React, useState, useEffect} from 'react';
import axios from 'axios';


export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days:[],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  
  const updateSpots = (incomingState, day) => {
    
    const state = { ...incomingState }
    const currentDay = day || state.day
  
    // Find the day the object
    const currentDayObj = state.days.find(dayObj => dayObj.name === currentDay)
    const currentDayIndex = state.days.findIndex(dayObj => dayObj.name === currentDay)
    // Find the appointment id array
    const listOfAppointmentIds = currentDayObj.appointments
    // Look for the null interviews in each appointment from the array
    const listOfNullAppointments = listOfAppointmentIds.filter(id => !state.appointments[id].interview)
    // Sum them up
    const spots = listOfNullAppointments.length
    // update the value of the key 'spots' in the day with the sum I just made
    const updatedDayObj = { ...currentDayObj, spots }
  
    state.days = [...incomingState.days]
    state.days[currentDayIndex] = updatedDayObj
    
    return state
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(response => {
      
      setState(prevState => {
      const newState = { ...prevState, appointments }
      const newNewState = updateSpots(newState)

      return newNewState
  })
    });

  }

  function cancelInterview(id) {
    const appointmentNull = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointmentNull
    };

    
    
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
   
      setState(prevState => {
      const newState = { ...prevState, appointments }
      const newNewState = updateSpots(newState)

      return newNewState
    })
    
  })
}

  useEffect(() => {
    
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  },[]);
  return { state, setDay, bookInterview, cancelInterview};

}