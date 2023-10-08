export const outputUnselectables = (selected, biglist) => {
    const output = [];
    if (selected.length === 0) {
        return output;
    }
    // check for overlap, output overlapping classes
    else {
        selected.forEach((course) => {
            const selected_course = biglist.find(e => e.id === course);
            biglist.forEach((overlap_course) => {
                if (selected_course.id !== overlap_course.id) {
                    if (courseOverlap (selected_course, overlap_course)) {
                        // console.log(overlap_course);
                        output.push(overlap_course.id); 
                    }
                }
            });
        });
        // console.log(output);
        return output;
    }
};

export const courseOverlap = (course1, course2) => {
    if (course1.term === course2.term) {
        return dayOverlap (course1, course2);
    }
    return false;
};

const dayOverlap = (course1, course2) => {
    const meets1 = course1.meets;
    const meets2 = course2.meets;

    if (meets1.includes('M') && meets2.includes('M')) {
        return timeOverlap (course1, course2);
    }
    if (meets1.includes('Tu') && meets2.includes('Tu')) {
        return timeOverlap (course1, course2);
    }
    if (meets1.includes('W') && meets2.includes('W')) {
        return timeOverlap (course1, course2);
    }
    if (meets1.includes('Th') && meets2.includes('Th')) {
        return timeOverlap (course1, course2);
    }
    if (meets1.includes('F') && meets2.includes('F')) {
        return timeOverlap (course1, course2);
    }
    return false;
};

const convertTimeToInt = (timeString) => {
    const hours = parseInt(timeString.split(":")[0], 10);
    const minutes = parseInt(timeString.split(":")[1], 10);
  
    return hours * 60 + minutes;
};

const timeOverlap = (course1, course2) => {
    const begin_time1 = course1.meets.split(" ")[1].split("-")[0];
    const begin_time2 = course2.meets.split(" ")[1].split("-")[0];

    const end_time1 = course1.meets.split("-")[1];
    const end_time2 = course2.meets.split("-")[1];

    const begin_time1_int = convertTimeToInt(begin_time1);
    const begin_time2_int = convertTimeToInt(begin_time2);
    const end_time1_int = convertTimeToInt(end_time1);
    const end_time2_int = convertTimeToInt(end_time2);
    
    if (begin_time2_int >= begin_time1_int && begin_time2_int <= end_time1_int) {
        return true;
    }
    if (end_time2_int >= begin_time1_int && end_time2_int <= end_time1_int) {
        return true;
    }
    return false;
};