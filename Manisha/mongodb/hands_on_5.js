// Hands On 5: MongoDB - Document Modelling, CRUD and Aggregation
// Database: college_nosql
// Collection: feedback
// All commands below can be run in MongoDB Compass shell tab or mongosh

// =============================================
// Task 1: Create Collection and Insert Documents
// =============================================

// create database and collection
use college_nosql

// insert 10 feedback documents (done via Compass GUI - see screenshot)
// verify count
db.feedback.countDocuments()
// should return 10

// =============================================
// Task 2: CRUD Operations
// =============================================

// READ: find all feedback with rating 5
db.feedback.find({ rating: 5 })

// READ: find CS101 feedback with challenging tag
db.feedback.find({
    course_code: "CS101",
    tags: "challenging"
})

// READ: projection - only show student_id, course_code, rating
// exclude _id field
db.feedback.find(
    {},
    { student_id: 1, course_code: 1, rating: 1, _id: 0 }
)

// UPDATE: add needs_review field to low rated docs (rating < 3)
db.feedback.updateMany(
    { rating: { $lt: 3 } },
    { $set: { needs_review: true } }
)

// UPDATE: push reviewed tag to all docs where needs_review is true
db.feedback.updateMany(
    { needs_review: true },
    { $push: { tags: "reviewed" } }
)

// DELETE: remove feedback from 2021-EVEN semester
db.feedback.deleteMany({ semester: "2021-EVEN" })

// verify count after delete
db.feedback.countDocuments()

// =============================================
// Task 3: Aggregation Pipeline
// =============================================

// Pipeline 1: filter 2022-ODD, group by course, sort by avg rating
db.feedback.aggregate([
    // stage 1: filter semester
    { $match: { semester: "2022-ODD" } },
    // stage 2: group by course and calculate avg rating and count
    {
        $group: {
            _id: "$course_code",
            avg_rating: { $avg: "$rating" },
            total_feedback: { $sum: 1 }
        }
    },
    // stage 3: sort by avg rating descending
    { $sort: { avg_rating: -1 } }
])

// Pipeline 2: same as above but rename avg_rating and round it
db.feedback.aggregate([
    { $match: { semester: "2022-ODD" } },
    {
        $group: {
            _id: "$course_code",
            avg_rating: { $avg: "$rating" },
            total_feedback: { $sum: 1 }
        }
    },
    {
        $project: {
            course_code: "$_id",
            average_rating: { $round: ["$avg_rating", 1] },
            total_feedback: 1,
            _id: 0
        }
    },
    { $sort: { average_rating: -1 } }
])

// Pipeline 3: tag frequency leaderboard
db.feedback.aggregate([
    // unwind breaks each tag into separate document
    { $unwind: "$tags" },
    // group by tag and count occurrences
    {
        $group: {
            _id: "$tags",
            count: { $sum: 1 }
        }
    },
    // sort by count descending
    { $sort: { count: -1 } }
])

// create index on course_code for faster lookups
db.feedback.createIndex({ course_code: 1 })

// verify index is used with explain
db.feedback.find({ course_code: "CS101" }).explain("executionStats")
// look for IXSCAN in the output instead of COLLSCAN