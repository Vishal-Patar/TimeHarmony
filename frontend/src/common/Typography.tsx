import { Typography as MuiTypography } from "@mui/material";

type variantType =
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "inherit"
  | "overline"
  | "subtitle1"
  | "subtitle2";

interface TypographyProps {
  variant: variantType;
  children: string;
}

const Typography = ({ variant, children, ...props }: TypographyProps) => {
  return (
    <MuiTypography variant={variant} {...props}>
      {children}
    </MuiTypography>
  );
};

export default Typography;
