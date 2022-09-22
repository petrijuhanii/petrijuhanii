interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface exerciseValues {
  targetHours: number;
  dailyHours: Array<number>;
}

const parseExArguments = (args: Array<string>): exerciseValues => {
  if (args.length < 2) throw new Error('parameters missing');

  if (!isNaN(Number(args[0]))) {
    const dailyHoursArray = args.slice(1).map(str => {
      if(!isNaN(Number(str))){
        return Number(str);
      }else{
        throw new Error('malformatted parameters');
      }
    });
    return {
      targetHours: Number(args[0]),
      dailyHours: dailyHoursArray
    };
  } else {
    throw new Error('malformatted parameters');
  }
};

const calculateExercises = (dailyHours: Array<number>, target: number) : Result => {
  const average = dailyHours.reduce((a, b) => a + b, 0) / dailyHours.length;
  const success = dailyHours.reduce((a, b) => a + b, 0) / dailyHours.length >= target;
  let rating = 2;
  let ratingDescription = 'Good job!';
  if(average >= target * 1.2){
    rating = 3;
    ratingDescription = 'Well done!';
  }
  if(average < target){
    rating = 1;
    ratingDescription = 'Better luck next time!';
  }
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

export default {calculateExercises, parseExArguments};