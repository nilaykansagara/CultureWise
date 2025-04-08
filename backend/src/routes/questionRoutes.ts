import { Router } from 'express';
import multer from 'multer';
import { generateQuestions } from '../services/questionService';
import { QuestionRequest } from '../types/question';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/generate', upload.fields([
  { name: 'companyCulture', maxCount: 1 },
  { name: 'jobRequirements', maxCount: 1 }
]), async (req, res) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const body = req.body as QuestionRequest;

    let companyCulture = body.companyCulture;
    let jobRequirements = body.jobRequirements;

    if (files.companyCulture?.[0]) {
      companyCulture = files.companyCulture[0].buffer.toString('utf-8');
    }

    if (files.jobRequirements?.[0]) {
      jobRequirements = files.jobRequirements[0].buffer.toString('utf-8');
    }

    const questions = await generateQuestions(companyCulture, jobRequirements);
    res.json({ questions, status: 'success' });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate questions'
    });
  }
});

export const questionRoutes = router; 