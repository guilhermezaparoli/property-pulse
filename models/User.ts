import { Schema, model, models } from "mongoose";



const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        require: [true, 'Email is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    image: {
        type: String,
    },
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            red: 'Property'
        }
    ]
}, {
    timestamps: true
})

const User = models.user || model("User", UserSchema)

export default User