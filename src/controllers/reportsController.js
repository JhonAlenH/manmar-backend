import Reports from '../db/Reports.js';

const generateReport = async (req, res) => {
  try {
    const report = await Reports.generateReport(req.body);
    if (report.error) {
      return res.status(report.code).send({
        status: false,
        message: report.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Reporte Generado',
      data: report
    });
  } catch (error){

  }
}

export default {
  generateReport,
}