function ExerciseIntro() {
  return (
    <div className={"text-md text-zinc-600 mt-3"}>
      <p className={"font-semibold text-2xl text-white"}>
        Welcome to your personalized exercise plan!
      </p>
      <p className={"mt-2 text-white"}>
        Whether you're a beginner or experienced, we provide exercise plans
        tailored to your goals. Our plans are designed to help you improve
        strength, endurance, and overall fitness.{" "}
        <span className={"mt-2 font-bold"}>
          Get started with your personalized exercise routine now!
        </span>
      </p>
    </div>
  );
}
function DietIntro() {
  return (
    <div className={"text-md text-zinc-600 mt-3"}>
      <p className={"font-semibold text-2xl text-white"}>
        Welcome to your personalized diet plan!
      </p>
      <p className={"mt-2 text-white"}>
        Whether you want to lose weight, build muscle, or simply eat healthier,
        we create customized meal plans just for you. Our diet plans are
        designed to support your fitness journey and nutritional needs.{" "}
        <span className={"mt-2 font-bold"}>
          Start your nutrition journey today with your personalized diet plan!
        </span>
      </p>
    </div>
  );
}
export { DietIntro, ExerciseIntro };
