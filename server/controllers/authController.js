import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE,PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: 'Missing Details' });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

   
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

   
    const mailOptions ={
      from: process.env.SENDER_EMAIL,
      to:email,
      subject:'Welcome to juicyncrazy',
      text:`Welcome to juicyncrazy website. Your account has been created with email id: ${email}`
    }

    await transporter.sendMail(mailOptions);

    return res.json({ success: true });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid password' });
    }

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ success: true });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


export const sendVerifyOtp = async (req,res)=>{
  try{

    const {userId}=req.body;

    const user = await userModel.findById(userId);

    if(user.isAccountVerified){
      return res.json({success:false,message:"Account already verified"})
    }

   const otp= String(Math.floor(100000 + Math.random()*900000 ));

   user.verifyOtp=otp;
   user.verifyOtpExpireAt=Date.now()+24*60*60*1000

   await user.save();

   const mailOption={
    from: process.env.SENDER_EMAIL,
    to:user.email,
    subject:'Account Verification OTP',
    // text:`Your OTP is ${otp}. Verify your account using this OTP.`
    html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}",user.email)
   }

   await transporter.sendMail(mailOption);

   res.json({success:true,message: 'Verification OTP Sent on Email '})

  }catch(error){
    res.json({success:false,message:error.message});
  }
}

//Verify email using OTP
export const verifyEmail = async(req,res)=>{
  const {userId,otp}=req.body;

  if(!userId || !otp){
    return res.json({success:false,message:'Missing Details'});
  }
  try{
    const user = await userModel.findById(userId);

    if(!user){
      return res.json({success:false, message: 'User not found'});
    }

    if(user.verifyOtp ==='' || user.verifyOtp !==otp){
      return res.json({success:false,message:'Invalid OTP'});
    }
    if(user.verifyOtpExpireAt < Date.now()){
      return res.json({success:false,message:'OTP Expired'});
    }

    user.isAccountVerified=true;
    user.verifyOtp='';
    user.verifyOtpExpireAt=0;

    await user.save();
    return res.json({success:true,message:'Email verified successfully'})

  }catch(error){
    return res.json({success:false,message:error.message});
  }
}

//Check if user is authenticated
export const isAuthenticated = async(req,res)=>{
  try{
    return res.json({success:true});

  }catch(error){
    res.json({success:false,message:error.message});
  }

}

//send Password reset OTP
export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: 'Email is required' });
    }

    // Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Generate a 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const otpExpireAt = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

    // Store OTP in the database
    user.resetOtp = otp;
    user.resetOtpExpireAt = otpExpireAt;
    await user.save();

    // Send email with OTP
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Password Reset OTP',
      // text: `Your OTP for password reset is ${otp}. It will expire in 15 minutes.`,
      html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: 'Password reset OTP sent to your email' });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Reset User Password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate inputs
    if (!email || !otp || !newPassword) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    // Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Check if OTP is valid and not expired
    if (user.resetOtp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }
    
    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: 'OTP Expired' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear OTP fields
    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: 'Password reset successful' });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};