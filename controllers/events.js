import { getUpcomingSeminars, getAllUpcomingSeminars} from "./database.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const home = (req, res)=>{
    const publicPath = path.join(__dirname, '../public');
    res.sendFile(path.join(publicPath, 'home.html'));
};


export const allLatestEvents = async (req, res) => {
    try {
        const seminars = await getUpcomingSeminars();
        res.json(seminars); // Send data as JSON
    } catch (error) {
        console.error('Error fetching seminars:', error);
        res.status(500).json({ error: 'Server Error' });
    }
}

export const allEvents = async (req, res) => {
    try {
        const seminars = await getAllUpcomingSeminars();
        console.log(seminars);
        res.json(seminars); // Send data as JSON
    } catch (error) {
        console.error('Error fetching seminars:', error);
        res.status(500).json({ error: 'Server Error' });
    }
}

