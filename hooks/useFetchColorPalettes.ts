import { ColorPalette } from '@/models/color-palette.model';
import { useEffect } from 'react';
// import useSWRImmutable from 'swr/immutable'
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation'

const fetcher = url => fetch(url, {
  cache: "no-cache",
  headers: {
    "Accept-Encoding": "*",
    "Accept": 'application/json',
  }
}).then(res => res.json())

const API_URL = "https://color-palette-api.kadikraman.vercel.app/palettes";

export default function useFetchColorPalettes() {
  
  const { data, error, isLoading, mutate, isValidating  } = useSWR(API_URL, fetcher)
  // useSWRMutation(API_URL, fetcher)
  useEffect(() => {
    console.log(`[useFetchColorPalettes] {isLoading: ${isLoading}, isValidating: ${isValidating}}`)
  }, [isLoading, isValidating])
  
  if(error) {
    console.error("[useFetchColorPalettes]: ", error)
    throw error;
  }

  return {
    colorPalettes: data as ColorPalette[] | undefined,
    isFetching: isValidating,
    refresh: mutate
  }
}