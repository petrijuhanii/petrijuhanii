interface BmiValues {
  height: number;
  weight: number;
};
  
const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  };
};

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height/100)**2);
  let category = 'Normal (healthy weight)';
  if(bmi<18.4){
      category = 'Underweight';
  };
  if(bmi>25.0){
      category = 'Overweight';
  };
  return(
      category
  );
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  };
  console.log(errorMessage);
};