exports.public = (req, res) => {
    res.json({ message: "this is a public route"});
}

exports.protected = (req, res) => {
    res.json({message: "this is a protected route for authenticated users"});
}

exports.moderator = (req, res) => {
    res.json({message: "this is a route only for moderators or admins"});
}

exports.admin = (req, res) => {
    res.json({message: "this is a route only for admins"});
}