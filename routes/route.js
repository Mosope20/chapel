import express from 'express';
import{studentAttendance, submitAttendance, attendancePage} from '../controllers/attendence.js'
import { createEvent,getEventPage, deleteEvent } from '../controllers/admin.js';
import { allLatestEvents, home, allEvents} from '../controllers/events.js';


const router = express.Router();


router.get('/api/records', studentAttendance);
router.get('/api/seminars', allLatestEvents);
router.get('/api/allSeminars', allEvents);


router.get('/attendance', attendancePage)
router.post('/attendance', submitAttendance);

router.get('/home', home)
router.post('/admin/createEvent',createEvent)
router.get('/admin/getEventPage',getEventPage)


router.post('/deleteEvent', deleteEvent);


export default router;