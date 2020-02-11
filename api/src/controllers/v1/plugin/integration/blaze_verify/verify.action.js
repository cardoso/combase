import axios from 'axios';

import Plugin from '../../../../models/plugin';

exports.blazeVerifyExecVerify = async (req, res) => {
	try {
		const { email } = req.data;

		if (!email) {
			console.error('An email is required for verification.');
			return res.status(400).json({ error: 'An email is required for verification' });
		}

		const { keys: { api_key } } = await Plugin.findOne({ name: 'blaze_verify' });

		if (!api_key) {
			console.error('Blaze Verify has not been initialized.');
			return res.status(400).json({ error: 'Blaze Verify has not been initialized.' });
		}

		const { data: { disposable, state, domain, score, gender } } = await axios.get(
			`https://api.blazeverify.com/v1/verify?email=${email.toLowerCase()}&api_key=${api_key}`
		);

		res.sendStatus(200).json({ disposable, state, domain, score, gender });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
