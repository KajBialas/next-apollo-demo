import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_DETAILS } from "../../apollo/queries/getDetails";

interface useListHook {
    detailsArray: {
      name: string;
      avatar: string;
      description: string;
      address: string;
    }[],
    shouldFetchMore: boolean,
    fetchMoreData: () => void,
    loading: boolean,
    inputValue: string,
    setInputValue: Dispatch<SetStateAction<string>>,
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

    const fetchMoreData = async () => {
        const { data: newData } = await fetchMore({
            variables: {
                limit: 20,
                search: inputValue,
                offset: detailsArray.length
            },
        })
        newData?.details.length < 20 ? setShouldFetchMore(false) : setShouldFetchMore(true);
        setDetailsArray([...detailsArray, ...newData.details])
    }

    return {
        detailsArray,
        shouldFetchMore,
        fetchMoreData,
        loading,
        inputValue,
        setInputValue,
    }
}