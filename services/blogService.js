//packages

//imports
const Metric = require("../models/metricsModel");
const customError = require("../errors");

async function getMetrics() {
  const metrics = await Metric.find({});
  const formattedMetrics = metrics.reduce((acc, metric) => {
    acc[metric.name] = metric.number;
    return acc;
  }, {});
  return formattedMetrics;
}

async function getNonFormattedMetrics() {
  const metrics = await Metric.find({});
  return metrics;
}

async function createMetric(data) {
  const metric = await Metric.create(data);
  return metric;
}

async function updateMetric(metricId, data) {
  const metric = await Metric.findOneAndUpdate(
    {
      _id: metricId,
    },
    data,
    {
      runValidators: true,
      new: true,
    }
  );
  return metric;
}

async function deleteMetric(metricId) {
  const metric = await Metric.findOneAndDelete({
    _id: metricId,
  });
  if (!metric) {
    throw new customError.NotFound(`No metric found with name: ${metricId}`);
  }
  return metric;
}

module.exports = {
  getMetrics,
  getNonFormattedMetrics,
  createMetric,
  updateMetric,
  deleteMetric,
};
