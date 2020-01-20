import Agent from '../../../models/agent';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const agent = await Agent.updateOne(
			{ _id: data.agent },
			{ $set: { status: 'inactive' } }
		);
		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
