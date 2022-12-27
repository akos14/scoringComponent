import { Box } from "@mui/system";

export function ErrorList({ errors, criteria, onChoseTask }) {
  return (
    <>
      <Box
        sx={{
          padding: "20px",
          position: "absolute",
          textDecoration: "underline",
          fontWeight: "bold",
          left: "75%",
          color: "red",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ul>
          {errors
            .filter((error) => error.msg !== "")
            .map((error) => (
              <li
                key={error.id}
                onClick={() =>
                  onChoseTask(
                    criteria.tasks.find(
                      (task) =>
                        task.name.substring(0, 1) ===
                        String(error.id).substring(0, 1)
                    )
                  )
                }
              >
                {"A(z) " +
                  String(error.id).substring(0, 1) +
                  ". feladat/" +
                  error.msg.substring(5, error.msg.length)}
              </li>
            ))}
        </ul>
      </Box>
    </>
  );
}
