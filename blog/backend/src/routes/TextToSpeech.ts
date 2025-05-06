import { Router } from "express";
import TextToSpeechController from "../app/controller/TextToSpeechController";
const textToSpeech = Router()

textToSpeech.post("/api/speak", TextToSpeechController.speak)

export default textToSpeech;