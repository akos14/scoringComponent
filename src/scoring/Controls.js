import { Button, Container } from "@mui/material";

export function Controls({
  criteria,
  chosenTask,
  onChoseTask,
  onSubmit,
  onCancel,
  results,
  canSubmit,
  addEmpty,
}) {
  const allowChange = criteria.tasks.length > 1;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "15px",
      }}
    >
      <Button
        sx={{
          marginRight: "24%",
          color: "white",
          backgroundColor: "#1877F2",
          padding: "10px",
          "&:hover": {
            backgroundColor: "#1877F2",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
        disabled={!allowChange ? true : false}
        onClick={() => {
          onChoseTask(
            criteria.tasks[
              (chosenTask.name.substring(0, 1) + 1) % criteria.tasks.length
            ]
          );
        }}
      >
        {"< Előző feladat"}
      </Button>
      <Button
        sx={{
          color: "white",
          backgroundColor: "green",
          padding: "10px",
          "&:hover": {
            backgroundColor: "green",
            opacity: [0.9, 0.8, 0.7],
          },
          marginRight: "5px",
        }}
        disabled={!canSubmit ? true : false}
        onClick={() => {
          let aspectIds = [];
          criteria.tasks.map((task) =>
            task.aspects.map((aspect) => aspectIds.push(aspect.id))
          );

          let resultIds = [];
          results.results.map((result) => resultIds.push(result.id));

          let missingIds = aspectIds.filter(
            (id) => resultIds.includes(id) === false
          );
          missingIds.map((id) => addEmpty(id));
          onSubmit(results);
        }}
      >
        Mentés
      </Button>
      <Button
        sx={{
          color: "white",
          backgroundColor: "#1877F2",
          padding: "10px",
          "&:hover": {
            backgroundColor: "#1877F2",
            opacity: [0.9, 0.8, 0.7],
          },
          marginLeft: "5px",
        }}
        onClick={() => onCancel(results)}
      >
        Mégsem
      </Button>
      <Button
        sx={{
          marginLeft: "20%",
          color: "white",
          backgroundColor: "#1877F2",
          padding: "10px",
          "&:hover": {
            backgroundColor: "#1877F2",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
        disabled={!allowChange ? true : false}
        onClick={() => {
          onChoseTask(
            criteria.tasks[
              (chosenTask.name.substring(0, 1) + 3) % criteria.tasks.length
            ]
          );
        }}
      >
        {"Következő feladat >"}
      </Button>
    </Container>
  );
}
