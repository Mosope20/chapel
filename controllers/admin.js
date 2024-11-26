import { insertIntoSeminar, checkIfEventExists, deleteAnEvent} from "./database.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




export const getEventPage = (req, res)=>{
    const publicPath = path.join(__dirname, '../public');
    res.sendFile(path.join(publicPath, 'admin.html'));
};

export const createEvent = async(req,res)=>
{

    const {seminar_title, seminar_date,seminar_time,speaker_name} = req.body;

    //
    if (!seminar_title || !seminar_date || !seminar_time || !speaker_name) {
        return res.status(400).send("All fields are required!");
    }

    try{
        // Check if the seminar title already exists
        const titleExists = await checkIfEventExists(seminar_title);

        if (titleExists) {
               // If title exists, redirect to the admin page with a query parameter
               return res.status(302).redirect('/admin/getEventPage?exists=true');
        }
        //inserting activity into db
        await insertIntoSeminar(seminar_title,seminar_date,seminar_time,speaker_name)
        res.status(302).redirect('/admin/getEventPage?created=true');
    }
    catch{
        res.redirect('/admin/getEventPage?success=false');
    }

};

export const deleteEvent = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required to delete a seminar." });
    }

    try {
        deleteAnEvent(title); 
        res.status(302).redirect('/admin/getEventPage?deleted=true');
    } catch (error) {
        console.error("Error deleting seminar:", error);
        res.status(302).redirect('/admin/getEventPage?success=false');
    }
};