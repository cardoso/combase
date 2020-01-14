import Agent from '../../../models/agent';

exports.get = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const organization = await Organization.findById(data.organization);
		res.status(200).json(organization);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
