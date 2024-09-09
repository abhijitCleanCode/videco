import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'

const Home = () => {
  const { user, setUser, setIsLogged } = useGlobalContext()
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // fetch data as soon as screen loads
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  // fetch latest posts
  const { data: latestPosts } = useAppwrite(getLatestPosts);


  const onRefresh = async () => {
    setRefreshing(true);

    // re call videos: if any new videos appear, it will be displayed
    await refetch()

    setRefreshing(false);
  }

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
          <View className = "my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome back,</Text>

                <Text className="font-psemibold text-2xl text-white">{user?.username}</Text>
              </View>

              <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'

                />
              </View>

            </View>

            <SearchInput />

            {/* view for video section */}
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg mb-3 font-pregular">Latest Videos</Text>
              {/* ??: if array not exist then return empty array */}
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No videos found"
            subtitle="Be the first to upload a video"
          />
        )}
        refreshControl={<RefreshControl 
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
      />
    </SafeAreaView>
  )
}

export default Home