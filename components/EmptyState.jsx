import React from 'react'
import { View, Text, Image } from 'react-native'
import { router } from 'expo-router'

import { images } from '../constants'
import CustomButton from '../components/CustomButton'

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className="justify-center items-center px-4">

            <Image
                source={images.empty}
                className="w-[270px] h-[215px]"
                resizeMethod='contain'
            />


            <Text className="font-psemibold text-2xl text-white text-center">{title}</Text>

            <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

            <CustomButton 
                title="Create Video"
                handlePress={() => router.push('/create')}
                containerStyles="w-full my-5"
            />
        </View>
    )
}

export default EmptyState