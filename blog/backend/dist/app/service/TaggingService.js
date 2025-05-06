var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TaggingRepository } from "../../db/mongo";
class TaggingService {
    save(taggingNames) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            console.log("taggings: ", taggingNames);
            for (let i = 0; i < taggingNames.length; i++) {
                let x = taggingNames[i];
                let tagging = yield this.findByName(x);
                if (!tagging) {
                    const insertVal = yield TaggingRepository.insertOne({
                        name: x
                    });
                    tagging = {
                        _id: insertVal.insertedId,
                        name: x
                    };
                }
                result.push(tagging);
            }
            console.log('tagging: ', result);
            return result;
        });
    }
    findByName(taggingId) {
        return TaggingRepository.findOne({
            name: taggingId
        });
    }
}
export default new TaggingService();
