import { Box, Skeleton } from "@mui/material";

const Loader = () => {
  return (
    <Box>
      {[...Array(10)].map((_, index) => (
        <Skeleton key={index} variant="rectangular" sx={{my: 2}} height={40}/>
      ))}
    </Box>
  );
};

export default Loader;
