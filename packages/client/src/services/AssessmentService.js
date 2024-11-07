import Axios from '../utils/http.config';

export class AssessmentService {
  static async submit(assessment) {
    try {
      console.log(`Data received in AssessmentService:`, assessment);
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      const response = await Axios.post(`/assessment/submit`, { assessment });
      return response.formData;
    }
    catch (err) {
      console.error(`Submission failed:`, err);
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static getList() {
    try {
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      return Axios.get(
        `assessment/list`, {
          params: {
          },
        }
      )
        .then(response => response.data.data.assessments);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static deleteAssessment(assessmentId) {
    try {
      return Axios.delete(`/assessment/delete/${assessmentId}`)
        .then(response => response.data);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }
}
