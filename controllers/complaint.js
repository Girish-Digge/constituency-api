const Complaint = require("../models/Complaint");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const getAllComplaints = async (req, res) => {
  const complaint = await Complaint.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ complaint, count: complaint.length });
};
const getComplaint = async (req, res) => {
  const {
    params: { id: complaintId },
  } = req;

  const Complaints = await Complaint.find({
    ward: complaintId,
  });
  if (!Complaints) {
    throw new NotFoundError(`No Complaints with in ward no: ${complaintId}`);
  }
  res.status(StatusCodes.OK).json({ Complaints });
};

const enrollComplaint = async (req, res) => {
  req.body.createdBy = req.user.name;
  const complaint = await Complaint.create(req.body);
  res.status(StatusCodes.CREATED).json({ complaint });
};
const updateComplaint = async (req, res) => {
  const {
    body: {
      status,
      type,
      related,
      location,
      name,
      contact,
      address,
      ward,
      brief,
      other,
    },
    user: { userId },
    params: { id: complaintId },
  } = req;
  const updatedComplaint = await Complaint.findByIdAndUpdate(
    { _id: complaintId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedComplaint) {
    throw new NotFoundError(`No Complaints with id ${complaintId}`);
  }
  res.status(StatusCodes.OK).json({ updatedComplaint });
};
const deleteComplaint = async (req, res) => {
  const {
    user: { userId },
    params: { id: complaintId },
  } = req;
  const deletedComplaint = await Complaint.findByIdAndDelete({
    _id: complaintId,
    createdBy: userId,
  });
  if (!deletedComplaint) {
    throw new NotFoundError(`No Complaints with id ${complaintId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllComplaints,
  getComplaint,
  enrollComplaint,
  updateComplaint,
  deleteComplaint,
};
