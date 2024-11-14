import express from 'express';
import { User } from '../models/User.js';
import { BoardApplication } from '../models/BoardApplication.js';
import { sendEmail } from '../config/email.js';
import { validateApplication } from '../validators/applicationValidator.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const validatedData = validateApplication(req.body);
    
    // Check if user exists or create new user
    let user = await User.findByEmail(validatedData.email);
    if (!user) {
      user = await User.create({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        squadron: validatedData.squadron
      });
    }

    // Create board application
    const application = await BoardApplication.create({
      userId: user.id,
      position: validatedData.position,
      boardMonth: 'October',
      boardYear: new Date().getFullYear()
    });

    // Send confirmation email
    await sendEmail({
      to: user.email,
      subject: 'Board Application Received',
      html: `
        <h1>Application Received</h1>
        <p>Thank you for applying to be a board member. We will review your application and notify you of the decision within 3 days.</p>
        <p>Position: ${validatedData.position}</p>
        <p>Squadron: ${validatedData.squadron}</p>
      `
    });

    res.status(201).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;