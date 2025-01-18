import mongoose, { HydratedDocument, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserField } from '../types';
import { randomUUID } from 'node:crypto';

interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}
type UserModel = Model<IUserField, {}, IUserMethods>;

const Schema = mongoose.Schema;
const SALT_WORK_FACTORY = 10;

const UserSchema = new Schema<
  HydratedDocument<IUserField>,
  UserModel,
  IUserMethods>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    validate:{
      validator:async function(this:HydratedDocument<IUserField>, value:string): Promise<boolean> {
        if(!this.isModified("username"))return true
        const user:IUserField | null = await User.findOne({username:value});
        return !user
      },
      message:"This username is already taken"
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  token: {
    type: String,
    required: [true, 'Token is required'],
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTORY);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.checkPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = async function () {
  this.token = randomUUID();
};

const User = mongoose.model('User', UserSchema);
export default User;
