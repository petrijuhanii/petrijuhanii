interface BmiValues {
  height: number;
  weight: number;
}
  
const parseBmiArguments = (args: Array<number>): BmiValues => {
  if (isNaN(args[0])) throw new Error('Height missing');
  if (isNaN(args[1])) throw new Error('Weight missing');

  return {
    height: Number(args[0]),
    weight: Number(args[1])
  };
};

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height/100)**2);
  let category = 'Normal (healthy weight)';
  if(bmi<18.4){
    category = 'Underweight';
  }
  if(bmi>25.0){
    category = 'Overweight';
  }
  return(
    {
      weight: weight,
      height: height,
      bmi: category
    }
  );
};

export default {calculateBmi, parseBmiArguments};