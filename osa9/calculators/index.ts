import express from 'express';
import bmi from './bmiCalculator';
import exercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = bmi.parseBmiArguments([Number(req.query.height), Number(req.query.weight)]);
    res.send(bmi.calculateBmi(height, weight));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: "malformatted parameters" });
    }
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" });
  }else{
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const { targetHours, dailyHours } = exercises.parseExArguments([target].concat(daily_exercises));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = exercises.calculateExercises(dailyHours, Number(targetHours));
      res.send(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ error: error.message });
      }
    }
  }
  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});