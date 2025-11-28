const path = require('path');
const os = require('os');
const { createObjectCsvWriter } = require('csv-writer');

exports.exportToCSV = async (data, headers, prefix='report') => {
  const filename = `${prefix}_${Date.now()}.csv`;
  const filepath = path.join(os.tmpdir(), filename);

  const csvWriter = createObjectCsvWriter({
    path: filepath,
    header: headers.map(h => ({ id: h, title: h }))
  });

  await csvWriter.writeRecords(data);
  return filepath;
};
