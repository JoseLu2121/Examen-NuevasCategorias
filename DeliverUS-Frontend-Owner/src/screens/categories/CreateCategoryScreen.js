import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { getRestaurantCategories, createRestaurantCategories, update } from '../../api/RestaurantEndpoints'
import { showMessage } from 'react-native-flash-message'
import * as yup from 'yup'
import { ErrorMessage, Formik } from 'formik'

export default function CreateCategoryScreen ({ navigation }) {
  const [backendErrors, setBackendErrors] = useState()

  const initialCategoryValues = { name: 'adsada', createdAt: new Date(), updatedAt: new Date() }
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(50, 'Name too long')
      .required('Name is required')
  })

  const createCategory = async (values) => {
    setBackendErrors([])
    try {
      const fetchedRestaurantCategories = await getRestaurantCategories()
      const reShapedfetchedRestaurantCategories = fetchedRestaurantCategories.filter((v) => v.name === values.name)
      console.log(reShapedfetchedRestaurantCategories)
      if (reShapedfetchedRestaurantCategories.length > 0) {
        showMessage({
          message: 'Category name in use',
          type: 'danger',
          style: GlobalStyles.flashStyle,
          titleStyle: GlobalStyles.flashTextStyle
        })
      } else {
        const createdCategory = await createRestaurantCategories(values)
        showMessage({
          message: `Category ${createdCategory.name} succesfully created`,
          type: 'success',
          style: GlobalStyles.flashStyle,
          titleStyle: GlobalStyles.flashTextStyle
        })
      // navigation.navigate('RestaurantDetailScreen', { id: route.params.id, dirty: true })
      }
    } catch (error) {
      console.log(error)
      setBackendErrors(error.errors)
    }
  }
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialCategoryValues}
      onSubmit={createCategory}>
      {({ handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem
                name='name'
                label='Name:'
              />
              <Pressable
                onPress={ handleSubmit }

                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? GlobalStyles.brandSuccessTap
                      : GlobalStyles.brandSuccess
                  },
                  styles.button
                ]}>
                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                  <MaterialCommunityIcons name='content-save' color={'white'} size={20}/>
                  <TextRegular textStyle={styles.text}>
                    Save
                  </TextRegular>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5

  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  },
  switch: {
    marginTop: 5
  }
})
