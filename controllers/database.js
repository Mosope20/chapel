import { createPool } from 'mysql2';

const pool = createPool({
    host: "localhost",
    user: "your root user",
    password: "root password",
    database: "chapel_seminar_db",
    connectionLimit: 3
})


export function checkIfEventExists(title){
    const checkQuery = `
    SELECT title FROM seminars WHERE title = (?);
    `;
    return new Promise((resolve, reject) => {
        pool.query(checkQuery, [title], (err, results) => {
            if (err) {
                console.error("Error getting title:", err);
                return reject(err); // Reject the Promise on error
            }
            const exists = results.length > 0;
            console.log("Title exists:", exists);
            resolve(exists); // Resolve with true or false
        });
    });
}


export function insertIntoSeminar(title, date, time, speaker) {
    const insertQuery = `
        INSERT INTO Seminars (title, date, time, speaker_name)
        VALUES (?, ?, ?, ?);
    `;

    return new Promise((resolve, reject) => {
        pool.query(insertQuery, [title, date, time, speaker], (err, results) => {
            if (err) {
                console.error("Error inserting seminar:", err);
                return reject(err); // Reject the Promise on error
            }
            console.log("Seminar added successfully:", results);
            resolve(results); // Resolve the Promise on success
        });
    });
}

export function getUpcomingSeminars(){
    const eventsQuery = `
    SELECT * FROM seminars
    WHERE date >= CURDATE()
    ORDER BY date ASC LIMIT 3;
`;

return new Promise((resolve, reject) => {
    pool.query(eventsQuery, (err, results) => {
        if (err) {
            console.error("Error getting seminars:", err);
            return reject(err); // Reject the Promise on error
        }
        console.log("Upcoming seminars retrieved successfully:", results);
        resolve(results); // Resolve the Promise with results
    });
});
}


export function getAllUpcomingSeminars(){
    const eventsQuery = `
    SELECT * FROM seminars
    WHERE date >= CURDATE()
    ORDER BY date ASC;
`;

return new Promise((resolve, reject) => {
    pool.query(eventsQuery, (err, results) => {
        if (err) {
            console.error("Error getting seminars:", err);
            return reject(err); // Reject the Promise on error
        }
        console.log("Upcoming seminars retrieved successfully:", results);
        resolve(results); // Resolve the Promise with results
    });
});
}


export function attendance(seminar_id, student_id, attendance_status, department){
    const queryAttendance = `
        INSERT INTO attendance (seminar_id, student_id, attendance_status, department)
        VALUES (?, ?, ?, ?);
    `;
    return new Promise((resolve, reject) => {
        pool.query(queryAttendance, [seminar_id, student_id, attendance_status, department],(err,results)=>{
            if (err) {
                console.error("Error updating attendance:", err);
                return reject(err); // Reject the Promise on error
            }
            console.log("Attendence Updated Successfully:", results);
            resolve(results); // Resolve the Promise with results
        });
       });
}

export function checkIfStudentSignedAlready(student_id, seminar_id){
    const query = `
        SELECT COUNT(*) AS count 
        FROM attendance 
        WHERE student_id = ? AND seminar_id = ?;
    `;

    return new Promise((resolve, reject) => {
        pool.query(query, [student_id, seminar_id], (err, results) => {
            if (err) {
                console.error("Error checking attendance:", err);
                return reject(err);
            }

            // If count > 0, the student is already registered for the seminar
            const exists = results[0].count > 0;
            resolve(exists);
        });
    });
}


export function deleteAnEvent(title){
    const query = `DELETE FROM seminars WHERE title = ?`;

    return new Promise((resolve, reject) => {
        pool.query(query, [title],(err,results)=>{
            if (err) {
                console.error("Error updating attendance:", err);
                return reject(err); // Reject the Promise on error
            }
            console.log("Deleted successfully");
            resolve(results); // Resolve the Promise with results
        });
       });
   
}



export async function allStudentAttendance() {
    const query = `
    SELECT 
    s.title AS seminar_title,
    a.student_id,
    a.department,
    a.attendance_status,
    a.attendance_id
FROM attendance a
JOIN seminars s ON a.seminar_id = s.seminar_id
ORDER BY s.title, a.department, a.student_id;
    `;

    return new Promise((resolve, reject) => {
        pool.query(query, (err, results) => {
            if (err) {
                console.error("Error fetching attendance records:", err);
                return reject(err);
            }

            resolve(results); // Resolve the attendance records
        });
    });
}
