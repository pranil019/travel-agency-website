const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    actionType: {
      type: String,
      required: true,
      trim: true,
    },
    actorType: {
      type: String,
      enum: ['guest', 'user', 'admin'],
      default: 'guest',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    userEmail: {
      type: String,
      default: '',
      trim: true,
      lowercase: true,
    },
    userName: {
      type: String,
      default: '',
      trim: true,
    },
    entityType: {
      type: String,
      default: '',
      trim: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    method: {
      type: String,
      default: '',
      trim: true,
    },
    path: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      default: '',
      trim: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    ipAddress: {
      type: String,
      default: '',
      trim: true,
    },
    userAgent: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ActivityLog', activityLogSchema);