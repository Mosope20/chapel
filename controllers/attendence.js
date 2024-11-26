import path from 'path';
import { fileURLToPath } from 'url';
import { allStudentAttendance, attendance, checkIfStudentSignedAlready} from './database.js';
import { title } from 'process';
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const studentAttendance = async (req, res) => {
    try {
        const records = await allStudentAttendance();

        if (records.length === 0) {
            return res.json({ message: "No attendance records available." });
        }

        res.json(records); // Send data as JSON
    } catch (error) {
        console.error("Error fetching attendance records:", error);
        res.status(500).json({ error: "Server Error. Could not fetch attendance records." });
    }
};

export const attendancePage = (req, res)=>{
    const publicPath = path.join(__dirname, '../public');
    res.sendFile(path.join(publicPath, 'attendance.html'));
};

export const submitAttendance = async (req, res) => {
    const { seminar_id, student_id, attendance_status, department } = req.body;
    console.log(seminar_id, student_id, attendance_status, department)
    if (!seminar_id || !student_id || !attendance_status || !department) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        const studentAttendanceMArked = await checkIfStudentSignedAlready(student_id,seminar_id);

        if (studentAttendanceMArked) {
               // If student exists, redirect to the attendance page with a query parameter
               return res.status(302).redirect('/attendance?exists=true');
        }
        await attendance(seminar_id, student_id, attendance_status, department)
        res.status(302).redirect('/attendance?success=true');;
    } catch (error) {            
        console.error("Error submitting attendance:", error);
        res.status(302).redirect('/attendance?success=false');;
    }
}