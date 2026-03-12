// Prisma handles the Student model — see prisma/schema.prisma
// For MongoDB/Mongoose fallback, uncomment and adapt:
//
// import mongoose from 'mongoose';
// const StudentSchema = new mongoose.Schema({
//   id: String, name: String, token: String,
//   totalLearningHours: { type: Number, default: 0 },
//   unlockedTiers: [Number],
//   preferences: Object,
//   dataLoggingOptIn: { type: Boolean, default: true },
// });
// export const Student = mongoose.model('Student', StudentSchema);
export {};
