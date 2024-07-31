const Service = require("../models/serviceModel");
const slugify = require("slugify");

exports.createService = async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    console.log("req.body", req.body);
    const slug = slugify(name, { lower: true });
    const service = new Service({ name, slug, description, icon });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateServiceBySlug = async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    const service = await Service.findOneAndUpdate(
      { slug: req.params.slug },
      { name, description, icon },
      { new: true }
    );
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOneAndDelete({ slug: req.params.slug });
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
