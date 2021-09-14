import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_DETAILS } from "../../apollo/queries/getDetails";

interface useListHook {
    detailsArray: {
      name: string;
      avatar: string;
      description: string;
      address: string;
      id: string;
    }[],
    shouldFetchMore: boolean,
    fetchMoreData: () => void,
    loading: boolean,
    inputValue: string,
    handleSetInputValue: (value: string) => void,
}

export const useList = (): useListHook => {
    const [getDetailsQuery, { data, loading, fetchMore }] = useLazyQuery(GET_DETAILS);
    const [detailsArray, setDetailsArray] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [shouldFetchMore, setShouldFetchMore] = useState(false);

    useEffect(() => {
        setDetailsArray(data?.details || []);
        data?.details.length < 20 ? setShouldFetchMore(false) : setShouldFetchMore(true);
    }, [data])

    useEffect(() => {
        getDetailsQuery({
            variables: {
                offset: 0,
                limit: 20,
                search: inputValue
            }
        })
    }, [inputValue])

    const handleSetInputValue = (value: string) => {
        setInputValue(value)
    };

    const fetchMoreData = async () => {
        const { data: newData } = await fetchMore({
            variables: {
                limit: 20,
                search: inputValue,
                offset: detailsArray.length
            },
        })
        newData?.details.length < 20 ? setShouldFetchMore(false) : setShouldFetchMore(true);
        setDetailsArray(prevState => [...prevState, ...newData.details])
    }

    return {
        detailsArray,
        shouldFetchMore,
        fetchMoreData,
        loading,
        inputValue,
        handleSetInputValue,
    }
}