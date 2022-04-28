import issues from '../../data/issues.json'

export default function handler(req, res) {
    res.status(200).json(issues)
  }

  