import Reports from '../db/Reports.js';

const emissionsReport = async (req, res) => {
  try {
    const report = await Reports.emissionsReport(req.body);
    if (report.error) {
      return res.status(report.code).send({
        status: false,
        message: report.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Reporte Generado',
      data: report.data,
      label: report.label
    });
  } catch (error){

  }
}

export default {
  emissionsReport,
}