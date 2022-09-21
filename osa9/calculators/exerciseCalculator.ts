interface exerciseValues {
  target: number;
  dailyHours: Array<number>;
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

const parseExArguments = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    const dailyHoursArray = args.slice(3).map(str => {
        if(!isNaN(Number(str))){
            return Number(str);
        }else{
            throw new Error('Provided values were not numbers!');
        };
    });
    return {
      target: Number(args[2]),
      dailyHours: dailyHoursArray
    }
  } else {
    throw new Error('Provided values were not numbers!');
  };
};

const calculateExercises = (dailyHours: Array<number>, target: number) : Result => {
    let average = dailyHours.reduce((a, b) => a + b, 0) / dailyHours.length;
    let success = dailyHours.reduce((a, b) => a + b, 0) / dailyHours.length >= target;
    let rating = 2;
    let ratingDescription = 'Good job!';
    if(average >= target * 1.2){
        rating = 3;
        ratingDescription = 'Well done!';
    };
    if(average < target){
        rating = 1;
        ratingDescription = 'Better luck next time!';
    };
    return{
        periodLength: dailyHours.length,
        trainingDays: dailyHours.filter(hours => hours != 0).length,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};

try {
    const { target, dailyHours } = parseExArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    };
    console.log(errorMessage);
  };