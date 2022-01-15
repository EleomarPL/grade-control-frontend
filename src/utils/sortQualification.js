export const sortQualification = ({qualifications}) => {
  let objectSemester = [];
  let ordenated = [];
  for (let i ; i < 15 ; i++) {
    ordenated[i] = null;
  }
  qualifications.forEach(value => {
    objectSemester[value.semester - 1] = objectSemester[value.semester - 1] === undefined ? [value] : [...objectSemester[value.semester - 1], value];
  });

  objectSemester.forEach((array, index) => {
    let ordenatedBySemester = [];
    array.forEach(value => {
      let {unit, score} = value;
      let property = value.course.toLowerCase();
      if (ordenatedBySemester[property] === undefined) {
        ordenatedBySemester[property] = [{unit, score}];
      } else {
        let existUnit = false;
        ordenatedBySemester[property].forEach((value) => {
          if (unit === value.unit) {
            existUnit = true;
          }
        });
        if (existUnit) {
          let modifyParameter = property[0].toUpperCase() + property.slice(1);
          if (ordenatedBySemester[modifyParameter] === undefined) {
            ordenatedBySemester[modifyParameter] = [{unit, score}];
          } else {
            ordenatedBySemester[modifyParameter] = [...ordenatedBySemester[modifyParameter], {unit, score}];
          }
        } else {
          ordenatedBySemester[property] = [...ordenatedBySemester[property], {unit, score}];
        }
      }
          
    });
    ordenated[index] = ordenatedBySemester;
  });
  
  return ordenated;
};