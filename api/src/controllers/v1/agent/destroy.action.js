import Agent from '../../../models/agent';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };
		const serialized = req.serialized;

		if (serialized.role !== 'admin') {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.'
			});
		}

		const agent = await Agent.updateOne({ _id: data.agent }, { $set: { status: 'inactive' } });
		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
