import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ListComponent from "./List.component";
jest.mock('@apollo/client');
import * as hooks from './useList.hook';

const mockFetchMore = jest.fn(() => ({}));

const exampleDetailsMock = [
    {
        name: 'Name 1',
        address: 'address 1',
        avatar: 'avatar 1',
        description: 'description 1'

    },
    {
        name: 'Name 2',
        address: 'address 2',
        avatar: 'avatar 2',
        description: 'description 3'
    },
    {
        name: 'Name 3',
        address: 'address 3',
        avatar: 'avatar 3',
        description: 'description 3'

    }
];

describe('List component', () => {
    it('should match snapshot', () => {
        jest.spyOn(hooks, 'useList').mockImplementation(() => ({
            detailsArray: exampleDetailsMock,
            shouldFetchMore: false,
            fetchMoreData: () => {},
            loading: false,
            inputValue: '',
            handleSetInputValue: () => {},
        }));

        const { container } = render(<ListComponent />);
        expect(container).toMatchSnapshot();
    });

    it('should display more button if more results are available', () => {
        jest.spyOn(hooks, 'useList').mockImplementation(() => ({
            detailsArray: exampleDetailsMock,
            shouldFetchMore: true,
            fetchMoreData: () => {},
            loading: false,
            inputValue: '',
            handleSetInputValue: () => {},
        }));

        const { getByTestId } = render(<ListComponent />);
        expect(getByTestId('loadButton')).toBeTruthy();
    });

    it('should not display more button if more results arent available', () => {
        jest.spyOn(hooks, 'useList').mockImplementation(() => ({
            detailsArray: exampleDetailsMock,
            shouldFetchMore: false,
            fetchMoreData: () => {},
            loading: false,
            inputValue: '',
            handleSetInputValue: () => {},
        }));

        const { queryByTestId } = render(<ListComponent />);
        expect(queryByTestId('loadButton')).toBeFalsy();
    });

    it('should call fetchMoreData on button click', () => {
        jest.spyOn(hooks, 'useList').mockImplementation(() => ({
            detailsArray: exampleDetailsMock,
            shouldFetchMore: true,
            fetchMoreData: mockFetchMore,
            loading: false,
            inputValue: '',
            handleSetInputValue: () => {},
        }));

        const { getByTestId } = render(<ListComponent />);
        fireEvent.click(getByTestId('loadButton'));
        expect(mockFetchMore).toHaveBeenCalled();
    });

    it('should show loader if loading is true', () => {
        jest.spyOn(hooks, 'useList').mockImplementation(() => ({
            detailsArray: [],
            shouldFetchMore: false,
            fetchMoreData: mockFetchMore,
            loading: true,
            inputValue: '',
            handleSetInputValue: () => {},
        }));

        const { getByTestId } = render(<ListComponent />);
        expect(getByTestId('loader')).toBeTruthy();
    });

    it('should not show loader if loading is false', () => {
        jest.spyOn(hooks, 'useList').mockImplementation(() => ({
            detailsArray: [],
            shouldFetchMore: false,
            fetchMoreData: mockFetchMore,
            loading: false,
            inputValue: '',
            handleSetInputValue: () => {},
        }));

        const { queryByTestId } = render(<ListComponent />);
        expect(queryByTestId('loader')).toBeFalsy();
    });

    it('should show no data message if records not exists', () => {
        jest.spyOn(hooks, 'useList').mockImplementation(() => ({
            detailsArray: [],
            shouldFetchMore: false,
            fetchMoreData: mockFetchMore,
            loading: false,
            inputValue: '',
            handleSetInputValue: () => {},
        }));

        const { getByTestId } = render(<ListComponent />);
        expect(getByTestId('noDataMessage')).toBeTruthy();
    });

    it('should not show no data message if records exists', () => {
        jest.spyOn(hooks, 'useList').mockImplementation(() => ({
            detailsArray: exampleDetailsMock,
            shouldFetchMore: false,
            fetchMoreData: mockFetchMore,
            loading: false,
            inputValue: '',
            handleSetInputValue: () => {},
        }));

        const { queryByTestId } = render(<ListComponent />);
        expect(queryByTestId('noDataMessage')).toBeFalsy();
    });
});
