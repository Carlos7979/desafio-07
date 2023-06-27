const authorization = role => {
	return async (req, res, next) => {
		if (!req.user) return res.status(401).send({ error: 'Unauthorized' })
		if (req.user.role !== role) res.status(403).send({ error: 'No permissions' })
		next()
	}
}

module.exports = authorization