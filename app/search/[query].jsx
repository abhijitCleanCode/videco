import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'


import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'


const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        // immediately pass the data in
        data={[]}
        keyExtractor={(item) => item.$id}
        // choose how the data will render
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        // customize the header component for that data
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>

            <Text className="font-psemibold text-2xl text-white">{query}</Text>

            <View className="mt-6 mb-8">
            <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search