import {Document} from "mongoose";

interface IPerson extends Document {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    nickname?: string;
}

export { IPerson }
