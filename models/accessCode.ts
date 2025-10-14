
import mongoose from "mongoose";

const accessCodeSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    accessCode: {
        type: String,
    }
})

const AccessCode = mongoose.models.AccessCode || mongoose.model("AccessCode", accessCodeSchema)

export default AccessCode;