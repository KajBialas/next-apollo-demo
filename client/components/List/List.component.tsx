import React from 'react';
import { Grid, Icon, Button, Message, Loader } from 'semantic-ui-react'
import { StyledCard } from './List.styles';
import SearchBarComponent from "../SearchBar/SearchBar.component";
import { LANG } from "../../lang/LANG";
import { useList } from "./useList.hook";

const ListComponent = (): JSX.Element => {
  const {
        detailsArray,
        shouldFetchMore,
        fetchMoreData,
        loading,
        inputValue,
        handleSetInputValue,
    } = useList();

  return (
    <div>
      <SearchBarComponent onChange={handleSetInputValue} currentValue={inputValue} />
      {inputValue !== '' && <Message><p>{LANG.EN.searchFilterLabel} {inputValue}</p></Message>}

      <Grid>
        <Grid.Row>
          {loading && <Grid.Column mobile={16} tablet={16} computer={16} data-testid="loader"><Loader /></Grid.Column>}

          {!detailsArray.length && !loading && <Grid.Column mobile={16} tablet={16} computer={16} data-testid="noDataMessage"><Message><p>No data available</p></Message></Grid.Column>}

          {detailsArray?.map((detail, index: number) => (
              <Grid.Column mobile={16} tablet={8} computer={4} key={`${detail?.name}-${index}`} data-testid='cardContainer'>
                <StyledCard
                    image={detail?.avatar}
                    header={detail?.name}
                    meta='Friend'
                    description={detail?.description}
                    extra={<div><Icon name='address book' />{detail?.address}</div>}
                />
              </Grid.Column>
          ))}
         </Grid.Row>
      </Grid>

      {shouldFetchMore &&
        <Button data-testid='loadButton' onClick={fetchMoreData}>{LANG.EN.loadMoreButtonLabel}</Button>
      }
    </div>
  )
}

export default ListComponent;