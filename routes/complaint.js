const express = require("express");
const router = express.Router();

const {
  getAllComplaints,
  getComplaint,
  enrollComplaint,
  updateComplaint,
  deleteComplaint,
} = require("../controllers/complaint");

router.route("/").post(enrollComplaint).get(getAllComplaints);

router
  .route("/:id")
  .get(getComplaint)
  .delete(deleteComplaint)
  .patch(updateComplaint);
module.exports = router;
