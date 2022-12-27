import { Container, Table, Typography } from "@mui/material";
import { Box } from "@mui/system";

export function Aspect({
  chosenTask,
  addScore,
  results,
  errors,
  changeError,
  inputs,
  changeInputs,
}) {
  const makeWrong = (e) => {
    let ins = inputs;
    let inputIndex = inputs.findIndex((input) => input.id === e.target.id);
    if (inputIndex === -1) {
      ins.push({ id: e.target.id, value: e.target.value });
    } else {
      ins.splice(inputIndex, 1, { id: e.target.id, value: e.target.value });
    }
    changeInputs(ins);
    changeError(errors);
    addScore(e.target, false);
  };

  const makeRight = (e) => {
    let ins = inputs;
    let inputIndex = inputs.findIndex((input) => input.id === e.target.id);
    if (inputIndex !== -1) {
      ins.splice(inputIndex, 1);
    }
    changeInputs(ins);
    changeError(errors);
    addScore(e.target, true);
  };

  const editResults = (e, aspect) => {
    if (aspect.type === "number") {
      let inputValue = Number(e.target.value);
      if (isNaN(inputValue)) {
        errors = [
          ...errors.filter((x) => x.id !== aspect.id),
          { id: aspect.id, msg: "A(z) " + aspect.name + " csak szám lehet!" },
        ];
        makeWrong(e);
      } else if (inputValue > aspect.maxValue) {
        errors = [
          ...errors.filter((x) => x.id !== aspect.id),
          {
            id: aspect.id,
            msg:
              "A(z) " +
              aspect.name +
              " nem lehet nagyobb mint " +
              aspect.maxValue +
              "!",
          },
        ];
        makeWrong(e);
      } else if (inputValue < 0) {
        errors = [
          ...errors.filter((x) => x.id !== aspect.id),
          {
            id: aspect.id,
            msg: "A(z) " + aspect.name + " nem lehet kisebb mint 0!",
          },
        ];
        makeWrong(e);
      } else if (aspect.required && e.target.value === "") {
        errors = [
          ...errors.filter((x) => x.id !== aspect.id),
          {
            id: aspect.id,
            msg: "A(z) " + aspect.name + " kitöltése kötelező!",
          },
        ];
        makeWrong(e);
      } else {
        errors = [
          ...errors.filter((x) => x.id !== aspect.id),
          {
            id: aspect.id,
            msg: "",
          },
        ];
        makeRight(e);
      }
    } else if (aspect.required && e.target.value === "") {
      errors = [
        ...errors.filter((x) => x.id !== aspect.id),
        {
          id: aspect.id,
          msg: "A(z) " + aspect.name + " kitöltése kötelező!",
        },
      ];
      makeWrong(e);
    } else {
      errors = [
        ...errors.filter((x) => x.id !== aspect.id),
        {
          id: aspect.id,
          msg: "",
        },
      ];
      makeRight(e);
    }
  };
  const numberInput = (aspect) => (
    <>
      <Container
        sx={{
          marginLeft: "28%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          id={aspect.id}
          type="text"
          required={aspect.required ? true : false}
          value={
            inputs.find((input) => Number(input.id) === Number(aspect.id)) !==
            undefined
              ? inputs.find((input) => Number(input.id) === Number(aspect.id))
                  .value
              : results.results.find((piece) => piece.id === aspect.id) !==
                undefined
              ? results.results.find((piece) => piece.id === aspect.id).value
              : ""
          }
          onChange={(e) => editResults(e, aspect)}
        ></input>
        <Box
          sx={{
            borderRadius: "0px 5px 5px 0px",
            border: "1px solid #000000",
            backgroundColor: "#E0E0E0",
            width: "40px",
            height: "15px",
            padding: "10px",
            display: "inline",
          }}
        >
          {"  / " + aspect.maxValue}
        </Box>
        <Box
          sx={{
            width: 1,
            color: "red",
          }}
        >
          {errors.find((error) => error.id === aspect.id)
            ? errors.find((error) => error.id === aspect.id).msg
            : ""}
        </Box>
      </Container>
    </>
  );

  const listInput = (aspect) => (
    <>
      <Container
        sx={{
          marginLeft: "28%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <select
          id={aspect.id}
          name="list-choice"
          value={
            results.results.find((piece) => piece.id === aspect.id) !==
            undefined
              ? results.results.find((piece) => piece.id === aspect.id).value
              : ""
          }
          onChange={(e) => editResults(e, aspect)}
        >
          <option key={-1} value=""></option>
          {Object.keys(aspect.values).map((key, index) => (
            <option
              key={Object.keys(aspect.values)[index]}
              value={Object.values(aspect.values)[index]}
            >
              {Object.keys(aspect.values)[index] +
                " - " +
                Object.values(aspect.values)[index]}
            </option>
          ))}
        </select>
        <Box
          sx={{
            width: 1,
            color: "red",
            display: "inline",
          }}
        >
          {errors.find((error) => error.id === aspect.id)
            ? errors.find((error) => error.id === aspect.id).msg
            : ""}
        </Box>
      </Container>
    </>
  );

  const booleanInput = (aspect) => (
    <>
      <Container
        sx={{
          marginLeft: "32%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          id={aspect.id}
          type="checkbox"
          checked={
            results.results.find((piece) => piece.id === aspect.id) !==
              undefined &&
            results.results.find((piece) => piece.id === aspect.id).value !== 0
              ? true
              : false
          }
          value={aspect.value}
          onChange={(e) => editResults(e, aspect)}
        ></input>
        <Box
          sx={{
            borderRadius: "0px 5px 5px 0px",
            border: "1px solid #000000",
            backgroundColor: "#E0E0E0",
            height: "15px",
            padding: "10px",
            display: "inline",
          }}
        >
          {aspect.value}
        </Box>
      </Container>
    </>
  );

  return (
    <>
      <Typography
        sx={{
          marginLeft: "30%",
          width: "40%",
          borderBottom: "3px solid #000000",
        }}
        variant="h6"
        component="h3"
      >
        Szempontok
      </Typography>
      {chosenTask !== undefined && chosenTask.aspects.length > 0 ? (
        <Table
          sx={{
            width: 0.75,
            margin: "auto",
          }}
        >
          <tbody>
            <tr>
              <th>#</th>
              <th>Szempont megnevezése</th>
              <th>Pontok</th>
              <th>Szempont leírása</th>
            </tr>
            {chosenTask.aspects.map((aspect, index) => (
              <tr key={index}>
                <td className="number">{aspect.id % 10}</td>
                <td className="name">
                  {aspect.required ? aspect.name + "*" : aspect.name}
                </td>
                <td className="score">
                  {aspect.type === "number"
                    ? numberInput(aspect)
                    : aspect.type === "list"
                    ? listInput(aspect)
                    : booleanInput(aspect)}
                </td>
                <td className="description">{aspect.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
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
          NINCSENEK SZEMPONTOK
        </Typography>
      )}
    </>
  );
}
