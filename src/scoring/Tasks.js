import { Tab, Tabs, Typography } from "@mui/material";

export function Tasks({
  criteria,
  chosenTask,
  onChoseTask,
  points,
  maxPoints,
  errors,
}) {
  let errorIds = [];
  errors
    .filter((error) => error.msg !== "")
    .map((errors) => errorIds.push(errors.id));
  let goodOnes = [];
  criteria.tasks.map((task) =>
    goodOnes.push(
      task.aspects.filter((aspect) => errorIds.includes(aspect.id) === false)
        .length
    )
  );

  let badOnes = criteria.tasks.map(
    (task) => task.aspects.length - goodOnes[task.name.substring(0, 1) - 1]
  );

  return (
    <>
      <Typography
        sx={{
          paddingTop: "30px",
          margin: "8px",
          textAlign: "center",
        }}
        variant="h4"
        component="h2"
      >
        {criteria.name}
      </Typography>
      <Typography
        sx={{
          paddingTop: "30px",
          margin: "8px",
          textAlign: "center",
        }}
        variant="h5"
        component="h2"
      >
        {points + " / " + maxPoints}
      </Typography>
      <div>
        <Typography
          sx={{
            marginLeft: "30%",
            width: "40%",
            borderBottom: "3px solid #000000",
          }}
          variant="h6"
          component="h3"
        >
          Feladatok
        </Typography>
        {criteria.tasks.length > 0 ? (
          <Tabs
            value={chosenTask.name.substring(0, 1) - 1 || 0}
            indicatorColor="primary"
            aria-label="secondary tabs example"
            sx={{
              margin: "8px",
            }}
            TabIndicatorProps={{
              sx: {
                bgcolor: "#1877F2",
                height: "5px",
              },
            }}
            centered
          >
            {criteria.tasks.map((task) => (
              <Tab
                label={
                  task.name +
                  " (" +
                  goodOnes[task.name.substring(0, 1) - 1] +
                  "✅" +
                  (badOnes[task.name.substring(0, 1) - 1] !== 0
                    ? badOnes[task.name.substring(0, 1) - 1] + "❌"
                    : "") +
                  "/" +
                  task.aspects.length +
                  ")"
                }
                key={task.name.substring(0, 1)}
                onClick={() => onChoseTask(task)}
              />
            ))}
          </Tabs>
        ) : (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "15px",
              fontWeight: "bold",
              color: "red",
            }}
          >
            NINCSENEK FELADATOK
          </Typography>
        )}
      </div>
    </>
  );
}
