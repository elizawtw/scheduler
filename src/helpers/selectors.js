export function getAppointmentsForDay(state, day) {
  
  // return state.days.appointments;
    let result = [];
    for(const selectedDay of state.days){
      if(selectedDay.name===day){
        for(const dayAppt of selectedDay.appointments){
          result.push(state.appointments[dayAppt]);
        }
      }
    }
    return result;
    
  }

  export function getInterview(state, interview) {
   
    if(!interview) {
      return null;
    }
    const interviewObj = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
    
    return interviewObj;
  }

  export function getInterviewersForDay(state, sDay) {

    
      let result = [];
      for(const selectedDay of state.days){
        
        if(selectedDay.name===sDay){
          for(const dayInt of selectedDay.interviewers){
           
            result.push(state.interviewers[dayInt]);
          }
        }
      }
      
      return result;
      
    }