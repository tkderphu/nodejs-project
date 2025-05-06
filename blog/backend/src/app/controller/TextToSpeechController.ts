import { existsSync, mkdirSync } from 'fs';
import path from 'path';
const gTTS = require('gtts');
const audioDir = path.join(__dirname, '..', 'audio');
if (!existsSync(audioDir)) mkdirSync(audioDir);
class TextToSpeechController {
    async speak(req: any, res: any, next: any) {
        try {
            const { line, lang } = req.body;
            if (!line) return res.status(400).send('No line provided');

            const gtts = new gTTS(line, lang);
            const filename = `./audio/${Date.now()}.mp3`;

            gtts.save(filename, function (err: any, result: any) {
                if (err) return res.status(500).send('Error generating speech');
                res.json({ url: `http://localhost:3000/audio/${filename.split('/').pop()}` });
            });

        } catch (err) {
            next(err)
        }
    }
}
export default new TextToSpeechController()