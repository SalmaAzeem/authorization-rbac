const bcrypt = require('bcryptjs'); 

const hashPassword = async(password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        return hashed_password;
    } catch (error) {
        console.error("failed to hash password: ", error);
        throw new Error("failed to hash password");
    }
};

const comparePassword = async(password, user_password) => {
    const is_matching = bcrypt.compare(password, user_password);
    return is_matching;
}

module.exports = {hashPassword, comparePassword};