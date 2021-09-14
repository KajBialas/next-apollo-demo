import { renderHook, act } from '@testing-library/react-hooks';
import { useList } from './useList.hook';
import { useLazyQuery } from "@apollo/client";
import {Dispatch, SetStateAction} from "react";

jest.mock('@apollo/client');

const mockUseLazyQuery = useLazyQuery as jest.MockedFunction<any>;
const getDetailsQuery = jest.fn();
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

describe('useList hook', () => {
    beforeEach(() => {
        mockUseLazyQuery.mockReturnValue([
            getDetailsQuery,
            {
                data: {
                    details: exampleDetailsMock
                },
                loading: false,
                fetchMore: mockFetchMore
            }
        ])
    });

    it('should return correctly value', () => {
        const { result } = renderHook(() => useList());

        const expectedResult = {
            detailsArray: exampleDetailsMock,
            shouldFetchMore: false,
            fetchMoreData: () => {},
            loading: false,
            inputValue: '',
        }

        expect(result.current).toEqual(expectedResult);
    });
})
