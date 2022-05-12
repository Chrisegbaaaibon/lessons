const mongoose = require('mongoose');
let schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let studentSchema = new schema({
    name: {
        type: String,
        required: false,
        min: 3
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phonenumber:{
        type: Number,
        required: true,
        unique: true
    },
    address:{
        type: String,
    },
    password: {
        required: true,
        type: String,
        min: 6
    }
},{
    timestamps: true
});

studentSchema.pre("save", function (next) {
	const user = this;

	if (!user.isModified("password")) return next();

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

studentSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Student', studentSchema);