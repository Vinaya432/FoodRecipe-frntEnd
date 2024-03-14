
import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

 // Create styles
 const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: '400px',
    height: '400px', // Adjust height as needed
    marginBottom: 10,
  },
});

function RecipePDFDocument({ recipedata }) {
  if (!recipedata) {
    return null; // Or render a message indicating no recipe data
  }
  return (
    <>
    
    <Document>
     <Page size="A4" style={styles.page}>
       <View style={styles.section}>
         <Text>Posted by: {recipedata.username} on {recipedata.timestamp}</Text>
         <Text>{recipedata.title}</Text>
         <Text>Procedure: {recipedata.description}</Text>
         {/* Include Recipe Image */}
         <Image src={recipedata.recipeImage} style={styles.image} />
         <Text>Ingredients:</Text>
         <View>
          {recipedata.ingredients && recipedata.ingredients.map((ingredient, index) => (
            <Text key={index}>{ingredient}</Text>
          ))}
        </View>
        <Text>Cooking Time: {recipedata.cookingTime}</Text>
     </View>
     </Page>
   </Document>

    </>
  )
}

export default RecipePDFDocument
