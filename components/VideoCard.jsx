import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { icons } from '../constants'
import { Video, ResizeMode } from 'expo-av'

const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }) => {
    // Track if video is playing or not
    const [ play, setPlay ]= useState(false)

  return (
    <View className="flex-col items-center px-4 mb-14">
        <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center flex-row flex-1">

                <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">

                    <Image 
                        source={{ uri: avatar }}
                        className="w-full h-full rounded-lg"
                        resizeMode="cover"
                    />

                </View>

                <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>

                    <Text className="text-gray-100 font-pregular text-xs">{username}</Text>
                </View>


            </View>

            {/* Allow user to do some additional action */}
            <View className="pt-2">
                <Image 
                    source={icons.menu}
                    className="w-5 h-5"
                    resizeMode="contain"
                />
            </View>

        </View>

        {/* Finally show the video */}
        {
            play ? (
                <Video 
                source={{uri: video}}
                className="w-full h-60 rounded-xl mt-3"
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                  if(status.didJustFinish) {
                    setPlay(false)
                  }
                }}
              />
            ) : (
                <TouchableOpacity
                    // when user clicks opacity changes
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                >
                    <Image
                        source={{ uri: thumbnail }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"
                    />
                    <Image 
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )
        }

      <Text className="text-2xl text-white">{title}</Text>
    </View>
  )
}

export default VideoCard