import mongoose from 'mongoose';

const AlertSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true, 
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    type: {
        type: String,
        enum: ['Workout', 'Meal', 'Goal', 'Custom'],
        default: 'Custom',
    },
    time: {
        type: String,
        required: [true, 'Time is required'], 
    },
    date: {
        type: String, 
    },
    repeat: {
        type: String,
        enum: ['Daily', 'Weekly', 'None'],
        default: 'Daily',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Alert = mongoose.model('Alert', AlertSchema);
export default Alert;