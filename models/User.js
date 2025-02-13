import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    personalDetails: {
        fullName: String,
        dateOfBirth: String,
        phone: String,
        address: String,
        occupation: String,
        annualIncome: Number
    },
    bankingDetails: {
        accountNumber: String,
        bankName: String,
        ifscCode: String
    },
    loanHistory: [{
        date: String,
        type: String,
        amount: Number,
        status: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', UserSchema); 