import { styled } from "../../stitches.config";

export const HomeMain = styled("main", {
  width: "100%",
  height: "100%",
  display: "grid",
  gridTemplateAreas:
    "'bmiSection userDataSection' 'extraInfoSection extraInfoSection' 'cloricInfoSection cloricInfoSection'",
  alignContent: "stretch",

  "@max768px": {
    gridTemplateAreas: "'bmiSection' 'extraInfoSection' 'userDataSection' 'cloricInfoSection'",
    alignContent: "inherit",
  },
});
