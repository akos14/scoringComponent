import { Box } from "@mui/system";

export function ProgressBar({ width }) {
  return (
    <Box
      sx={{
        height: "10px",
        width: width,
        backgroundColor: "green",
      }}
    ></Box>
  );
}
