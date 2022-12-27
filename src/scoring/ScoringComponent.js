import { Typography } from "@mui/material";
import { useState } from "react";
import { Controls } from "./Controls";
import { Aspect } from "./Aspect";
import { Tasks } from "./Tasks";
import { ProgressBar } from "./ProgressBar";
import { ErrorList } from "./ErrorList";

export function ScoringComponent({ criteria, onSubmit, onCancel }) {
  console.log(criteria);

  const defaultTask = criteria.tasks[0];
  const [chosenTask, setChosenTask] = useState(defaultTask);

  const [inputs, setInputs] = useState([]);

  const [results, setResults] = useState({ results: [] });

  let maxPoints = 0;
  criteria.tasks.map((task) =>
    task.aspects.map((aspect) => {
      if (aspect.required) {
        if (aspect.type === "list") {
          maxPoints += aspect.values.good;
        } else if (aspect.type === "number") {
          maxPoints += aspect.maxValue;
        } else if (aspect.type === "boolean") {
          maxPoints += aspect.value;
        }
      }
      return maxPoints;
    })
  );

  const [errors, setErrors] = useState(
    criteria.tasks
      .map((t) =>
        t.aspects.map(
          (aspect) =>
            (aspect = {
              id: aspect.id,
              msg: aspect.required
                ? "A(z) " + aspect.name + " kitöltése kötelező!"
                : "",
            })
        )
      )
      .reduce((p, c) => p.concat(c), [])
  );

  const [points, setPoints] = useState(0);

  const addScore = (field, correct) => {
    let data = results.results;
    let info = data.find((piece) => piece.id === Number(field.id));
    let infoIndex = data.findIndex((piece) => piece.id === Number(field.id));
    if (info === undefined) {
      let value = Number(field.value);
      if (field.type === "checkbox" && !field.checked) {
        value = 0;
      }
      data.push({
        id: Number(field.id),
        value: value,
      });
      if (!correct) {
        data.splice(infoIndex, 1);
      }
    } else {
      let value = Number(field.value);
      data.splice(infoIndex, 1, {
        id: Number(field.id),
        value: value,
      });
      if (!correct || (field.type === "checkbox" && !field.checked)) {
        data.splice(infoIndex, 1);
      }
    }
    data.sort(function (a, b) {
      return a.id - b.id;
    });
    setResults({ ...results, results: data });
    refreshPoints();
  };

  const addEmpty = (id) => {
    let data = results.results;
    data.push({
      id: Number(id),
      value: 0,
    });
    data.sort(function (a, b) {
      return a.id - b.id;
    });
    setResults({ ...results, results: data });
  };

  const refreshPoints = () => {
    let score = 0;
    results.results.forEach((aspect) => (score += aspect.value));
    setPoints(score);
  };

  const handleChoseTask = (task) => {
    setChosenTask(task);
  };

  let errorIds = [];
  errors
    .filter((error) => error.msg !== "")
    .map((errors) => errorIds.push(errors.id));
  let goodOnes = 0;
  criteria.tasks.map(
    (task) =>
      (goodOnes += task.aspects.filter(
        (aspect) => errorIds.includes(aspect.id) === false && aspect.required
      ).length)
  );

  let requiredOnes = 0;
  criteria.tasks.map(
    (task) =>
      (requiredOnes += task.aspects.filter((aspect) => aspect.required).length)
  );

  let progressPercentage = (goodOnes / requiredOnes) * 100 + "%";

  const canSubmit = progressPercentage === "100%";

  return (
    <>
      <Typography
        sx={{
          height: 30,
          backgroundColor: "#1877F2",
          color: "white",
          padding: "20px",
        }}
        variant="h4"
        component="h1"
        className="detailTitle"
      >
        Pontozó rendszer
      </Typography>
      <ProgressBar width={progressPercentage}></ProgressBar>
      <ErrorList
        errors={errors}
        criteria={criteria}
        onChoseTask={handleChoseTask}
      ></ErrorList>
      <div>
        <Tasks
          criteria={criteria}
          chosenTask={chosenTask}
          onChoseTask={handleChoseTask}
          points={points}
          maxPoints={maxPoints}
          results={results}
          errors={errors}
        ></Tasks>
        <Aspect
          chosenTask={chosenTask}
          addScore={addScore}
          results={results}
          errors={[].concat(errors)}
          changeError={(array) => {
            array.sort(function (a, b) {
              return a.id - b.id;
            });
            setErrors(array);
          }}
          inputs={inputs}
          changeInputs={(array) => {
            setInputs(array);
          }}
        ></Aspect>
      </div>
      <Controls
        criteria={criteria}
        chosenTask={chosenTask}
        onChoseTask={handleChoseTask}
        onSubmit={onSubmit}
        onCancel={onCancel}
        addScore={addScore}
        results={results}
        canSubmit={canSubmit}
        addEmpty={addEmpty}
      ></Controls>
    </>
  );
}
