import { Grid } from '@mantine/core';
import CellGrid from './CellGrid';
import { RecipePreview } from './RecipePreview';
import PropTypes from 'prop-types';

const Index = ({ meals, mealPlans, addRecipeToBoard }) => {
  const renderGrids = () => {
    return [...Array(mealPlans?.length)].map((row, i) => {
      return (
        <Grid.Col span={2} key={i}>
          {[...Array(mealPlans?.length - 1)].map((col, j) => (
            <CellGrid
              key={j}
              yIndex={j}
              xIndex={i}
              isBoard={true}
              addRecipeToBoard={addRecipeToBoard}
            >
              {mealPlans[i][j][meals[j].toLowerCase()] && (
                <RecipePreview
                  recipe={mealPlans[i][j][meals[j].toLowerCase()]}
                />
              )}
            </CellGrid>
          ))}
        </Grid.Col>
      );
    });
  };

  return (
    <Grid ml={138} gutter={0}>
      {renderGrids()}
    </Grid>
  );
};

Index.propTypes = {
  meals: PropTypes.array.isRequired,
  mealPlans: PropTypes.array.isRequired,
  addRecipeToBoard: PropTypes.func.isRequired,
};

export default Index;
