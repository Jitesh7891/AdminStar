import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
import Header from "components/Header";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          //uske hisaab se 700 thi
          color={theme.palette.secondary[300]}
          fontWeight="bold"
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>

          {/* price is fixed at 2 decimals at most */}
          ${Number(price).toFixed(2)}
        </Typography>

        {/* Rating componet given by mui only */}
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent
        sx={{
          color:"#999999"
        }}
        >
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat[0].yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat[0].yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)")
  console.log(data)
  return (
    <Box
      m="1.5rem 2.5rem"
      
    >
      <Header title="PRODUCTS" subtitle="See your list of products." />

      {data || !isLoading ? (
        <Box
          // backgroundColor="red"
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            // we r targeting the immediate div
            //if it is not mobile screen then the child will take all availabe space (i.e 4)
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >

{/* see carefully map is taking an arrow function data.map(arrow_function)  */}
          {data.map(({
            _id,
            name,
            description,
            price,
            rating,
            category,
            supply,
            stat,
     })=>(
          <Product
            key={_id}
            _id={_id}
            name={name}
            description={description}
            price={price}
            rating={rating}
            category={category}
            supply={supply}
            stat={stat}
          />
   ))}


        </Box>
      ) : (
        <Box>
          Loading...
        </Box>
      )}

    </Box>
  )
}

export default Products
