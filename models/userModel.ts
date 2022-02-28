import bcrypt from "bcryptjs";
import { model, models } from "mongoose";
import IUser from "../interfaces/user";
import userSchema from "../schemas/user";

userSchema.pre<IUser>("save", function save(next) {
    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(this.password, salt, (err: Error, hash: string) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (
    candidatePassword: string,
    callback: any
) {
    bcrypt.compare(
        candidatePassword,
        this.password,
        (err: Error, isMatch: boolean) => {
            callback(err, isMatch);
        }
    );
};

export default models.User || model<IUser>("User", userSchema);