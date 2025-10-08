import mongoose from "mongoose";

const passwordDetailsSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    encryptedData: {
        type: String,
    }
})

const PasswordDetail = mongoose.models.PasswordDetail || mongoose.model("PasswordDetail", passwordDetailsSchema)

export default PasswordDetail;