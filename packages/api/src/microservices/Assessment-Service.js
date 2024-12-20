const { Assessment } = require(`../database/models`);


exports.submit = async (assessment) => {
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database
  const newAssessment = await Assessment.create({
    catDateOfBirth: assessment.catDob,
    catName: assessment.catName,
    createdAt: new Date(),
    instrumentType: 1,
    riskLevel: assessment.risk,
    score: assessment.score,
    updatedAt: new Date(),
  });
  return newAssessment;

};

exports.getList = async () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  const assessments = await Assessment.findAll();

  return assessments;
};

exports.Delete = async (assessmentId) => {
  const assessment = await Assessment.destroy({ where: { id: assessmentId } });
  return assessment;
};
