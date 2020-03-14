const initialState = {
  courses: [
    {
      id: 1,
      date: '18.02.2020',
      inputDate: '2020-02-18',
      title: 'Prerequisites',
      description: 'Webpack, AngularCLI, TypeScript',
      duration: '01h 34min'
    },
    {
      id: 2,
      date: '01.02.2020',
      inputDate: '2020-02-01',
      title: 'Components',
      description: 'Components; Lifecycle, template DSL and data-binding; Custom component',
      duration: '01h 34min'
    },
    {
      id: 3,
      date: '15.01.2020',
      inputDate: '2020-01-15',
      title: 'Directives + Pipes',
      description: 'Directives, types of directives, built-in directives, custom directive, pipes, built-in pipes, custom pipes, async pipe.',
      duration: '01h 34min'
    },
    {
      id: 4,
      date: '28.12.2019',
      inputDate: '2019-12-28',
      title: 'Modules & Services',
      description: 'Services, DI, modules, lazy loading.',
      duration: '01h 34min'
    },
    {
      id: 5,
      date: '29.11.2019',
      inputDate: '2019-11-29',
      title: 'Change detection',
      description: 'Zone js, flow, immutable data structure, push strategy.',
      duration: '01h 34min'
    },
    {
      id: 6,
      date: '03.11.2019',
      inputDate: '2019-11-03',
      title: 'Routing',
      description: 'Routing, lazy and preloading. CanActivate, CanDeactivate.',
      duration: '01h 34min'
    }
  ]
}

export default function stateInfo(state = initialState, action) {
  switch (action.type) {
    case 'DELETE_COURSE':
      state.courses = state.courses.filter(course => course.id !== action.payload);
      return { ...state }
    case 'ADD_COURSE':
      action.payload.id = state.courses.length + 1;
      action.payload.inputDate = action.payload.date.split('.').reverse().join('-');
      state.courses.unshift(action.payload);
      return { ...state }
    case 'EDIT_COURSE':
      state.courses.forEach(course => {
        if (course.id === action.payload.id) {
          course.title = action.payload.title;
          course.description = action.payload.description;
          course.duration = action.payload.duration;
          course.authors = action.payload.authors;
          course.date = action.payload.date;
          course.inputDate = course.date.split('.').reverse().join('-');
        }
      });
      return { ...state }
    default:
      return state
  }
}